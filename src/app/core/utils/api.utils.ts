import { HttpErrorResponse } from '@angular/common/http';
import { ApiError } from '../models/api.model';

export function normalizeApiError(error: unknown): ApiError {
    if (error instanceof HttpErrorResponse) {
        const serverMessage =
            error.error?.message ||
            error.error?.error ||
            (typeof error.error === 'string' ? error.error : null);

        const errors: string[] = Array.isArray(error.error?.errors) ? error.error.errors : [];

        return {
            message: serverMessage || 'Unexpected server error',
            statusCode: error.status || 500,
            errors
        };
    }

    if (error instanceof Error) {
        return {
            message: error.message,
            statusCode: 0,
            errors: []
        };
    }

    return {
        message: 'An unknown error occurred',
        statusCode: 0,
        errors: []
    };
}
