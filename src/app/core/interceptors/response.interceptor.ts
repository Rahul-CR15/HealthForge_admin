import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { normalizeApiError } from '../utils/api.utils';
import { AuthTokenService } from '../services/auth-token.service';
import { NotificationService } from '../../shared/ui-services/notification.service';
import { RefreshTokenService } from '../services/refresh-token.service';

export const responseErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const authTokenService = inject(AuthTokenService);
    const refreshTokenService = inject(RefreshTokenService);
    const notificationService = inject(NotificationService, { optional: true });
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: unknown) => {
            const apiError = normalizeApiError(error);
            const skipRefresh = req.headers.get('skip-refresh') === 'true';
            const skipAuth = req.headers.get('skip-auth') === 'true';

            if (apiError.statusCode === 401 && !skipRefresh && !skipAuth) {
                return refreshTokenService.refreshToken().pipe(
                    switchMap((tokens) => {
                        const retryRequest = req.clone({
                            headers: req.headers.set('Authorization', `Bearer ${tokens.accessToken}`)
                        });
                        return next(retryRequest);
                    }),
                    catchError((refreshError) => {
                        authTokenService.clear();
                        notificationService?.showError('Session expired', 'Please sign in again.');
                        router.navigate(['/login']);
                        return throwError(() => normalizeApiError(refreshError));
                    })
                );
            }

            if (apiError.statusCode === 403) {
                notificationService?.showError('Access denied', 'You do not have permission to perform this action.');
            }

            if (apiError.statusCode >= 500) {
                notificationService?.showError('Server error', 'An unexpected server error occurred.');
            }

            return throwError(() => apiError);
        })
    );
};
