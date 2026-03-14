const ACCESS_TOKEN_STORAGE_KEY = 'tabletap.accessToken';
const REFRESH_TOKEN_STORAGE_KEY = 'tabletap.refreshToken';

const isBrowser = (): boolean => typeof window !== 'undefined';

const readFromStorage = (key: string): string | null => {
    if (!isBrowser()) {
        return null;
    }

    return window.localStorage.getItem(key);
};

const writeToStorage = (key: string, value: string): void => {
    if (!isBrowser()) {
        return;
    }

    window.localStorage.setItem(key, value);
};

const removeFromStorage = (key: string): void => {
    if (!isBrowser()) {
        return;
    }

    window.localStorage.removeItem(key);
};

export const getAccessToken = (): string | null => readFromStorage(ACCESS_TOKEN_STORAGE_KEY);

export const getRefreshToken = (): string | null => readFromStorage(REFRESH_TOKEN_STORAGE_KEY);

export const setAccessToken = (token: string): void => {
    writeToStorage(ACCESS_TOKEN_STORAGE_KEY, token);
};

export const setRefreshToken = (token: string): void => {
    writeToStorage(REFRESH_TOKEN_STORAGE_KEY, token);
};

export const setAuthTokens = (accessToken: string, refreshToken: string): void => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
};

export const clearAuthTokens = (): void => {
    removeFromStorage(ACCESS_TOKEN_STORAGE_KEY);
    removeFromStorage(REFRESH_TOKEN_STORAGE_KEY);
};
