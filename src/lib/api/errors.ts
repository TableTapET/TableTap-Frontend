import axios, { AxiosError } from 'axios';

export interface ApiError {
    message: string;
    statusCode: number | null;
    code: string | null;
    details: unknown;
    isNetworkError: boolean;
}

const FALLBACK_MESSAGE = 'Something went wrong while processing your request.';

const resolveErrorMessage = (error: AxiosError): string => {
    const data = error.response?.data;

    if (typeof data === 'string' && data.trim().length > 0) {
        return data;
    }

    if (typeof data === 'object' && data !== null) {
        const maybeMessage = (data as { message?: unknown }).message;
        if (typeof maybeMessage === 'string' && maybeMessage.trim().length > 0) {
            return maybeMessage;
        }
    }

    if (typeof error.message === 'string' && error.message.trim().length > 0) {
        return error.message;
    }

    return FALLBACK_MESSAGE;
};

export const normalizeApiError = (error: unknown): ApiError => {
    if (!axios.isAxiosError(error)) {
        return {
            message: FALLBACK_MESSAGE,
            statusCode: null,
            code: null,
            details: error,
            isNetworkError: false,
        };
    }

    const axiosError = error as AxiosError;

    return {
        message: resolveErrorMessage(axiosError),
        statusCode: axiosError.response?.status ?? null,
        code: axiosError.code ?? null,
        details: axiosError.response?.data,
        isNetworkError: !axiosError.response,
    };
};
