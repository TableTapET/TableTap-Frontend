import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosRequestConfig,
    InternalAxiosRequestConfig,
    RawAxiosRequestHeaders,
} from 'axios';

import { API_BASE_URL, API_TIMEOUT_MS, AUTH_REFRESH_PATH } from './config';
import { normalizeApiError } from './errors';
import { clearAuthTokens, getAccessToken, getRefreshToken, setAccessToken } from './tokens';

interface RefreshTokenResponse {
    access?: string;
    accessToken?: string;
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

interface QueuedRequest {
    // eslint-disable-next-line no-unused-vars
    resolve: (accessToken: string) => void;
    // eslint-disable-next-line no-unused-vars
    reject: (error: unknown) => void;
}

const refreshClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT_MS,
});

let isRefreshingToken = false;
let queuedRequests: QueuedRequest[] = [];

const setAuthorizationHeader = (
    headers: AxiosHeaders | RawAxiosRequestHeaders | undefined,
    token: string
): AxiosHeaders => {
    const nextHeaders = AxiosHeaders.from(headers);
    nextHeaders.set('Authorization', `Bearer ${token}`);
    return nextHeaders;
};

const flushQueue = (error: unknown, token: string | null): void => {
    queuedRequests.forEach((request) => {
        if (error || !token) {
            request.reject(error);
            return;
        }

        request.resolve(token);
    });

    queuedRequests = [];
};

const isRefreshRequest = (url: string | undefined): boolean => {
    if (!url) {
        return false;
    }

    return url.includes(AUTH_REFRESH_PATH);
};

const refreshAccessToken = async (refreshToken: string): Promise<string> => {
    const response = await refreshClient.post<RefreshTokenResponse>(AUTH_REFRESH_PATH, {
        refresh: refreshToken,
    });

    const newAccessToken = response.data.access ?? response.data.accessToken;
    if (!newAccessToken) {
        throw new Error('Refresh endpoint did not return a new access token.');
    }

    return newAccessToken;
};

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT_MS,
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const accessToken = getAccessToken();
        if (!accessToken) {
            return config;
        }

        config.headers = setAuthorizationHeader(config.headers, accessToken);
        return config;
    },
    (error: unknown) => Promise.reject(normalizeApiError(error))
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequestConfig | undefined;
        const isUnauthorized = error.response?.status === 401;

        if (
            !originalRequest ||
            !isUnauthorized ||
            originalRequest._retry ||
            isRefreshRequest(originalRequest.url)
        ) {
            return Promise.reject(normalizeApiError(error));
        }

        originalRequest._retry = true;
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
            clearAuthTokens();
            return Promise.reject(normalizeApiError(error));
        }

        if (isRefreshingToken) {
            return new Promise((resolve, reject) => {
                queuedRequests.push({
                    resolve: (newAccessToken: string) => {
                        originalRequest.headers = setAuthorizationHeader(
                            originalRequest.headers,
                            newAccessToken
                        );
                        resolve(apiClient(originalRequest as AxiosRequestConfig));
                    },
                    reject,
                });
            }).catch((queueError) => Promise.reject(normalizeApiError(queueError)));
        }

        isRefreshingToken = true;

        try {
            const newAccessToken = await refreshAccessToken(refreshToken);
            setAccessToken(newAccessToken);
            flushQueue(null, newAccessToken);

            originalRequest.headers = setAuthorizationHeader(
                originalRequest.headers,
                newAccessToken
            );
            return apiClient(originalRequest as AxiosRequestConfig);
        } catch (refreshError) {
            clearAuthTokens();
            flushQueue(refreshError, null);
            return Promise.reject(normalizeApiError(refreshError));
        } finally {
            isRefreshingToken = false;
        }
    }
);
