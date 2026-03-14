const DEFAULT_API_BASE_URL = 'http://localhost:8000/api';
const DEFAULT_API_TIMEOUT_MS = 15000;
const DEFAULT_REFRESH_PATH = '/auth/token/refresh/';

const toNumber = (value: string | undefined, fallback: number): number => {
    if (!value) {
        return fallback;
    }

    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const normalizePath = (path: string): string => {
    if (!path.startsWith('/')) {
        return `/${path}`;
    }

    return path;
};

const resolveApiBaseUrl = (): string => {
    const explicitApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
    if (explicitApiBaseUrl) {
        return explicitApiBaseUrl;
    }

    const legacyBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.trim();
    if (legacyBackendUrl) {
        return legacyBackendUrl;
    }

    return DEFAULT_API_BASE_URL;
};

export const API_BASE_URL = resolveApiBaseUrl();
export const API_TIMEOUT_MS = toNumber(
    process.env.NEXT_PUBLIC_API_TIMEOUT_MS,
    DEFAULT_API_TIMEOUT_MS
);
export const AUTH_REFRESH_PATH = normalizePath(
    process.env.NEXT_PUBLIC_AUTH_REFRESH_PATH?.trim() || DEFAULT_REFRESH_PATH
);
