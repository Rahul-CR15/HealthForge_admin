import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { AuthTokenService } from '../services/auth-token.service';
import { LoaderService } from '../../shared/ui-services/loader.service';
import { PUBLIC_API_PATHS } from '../config/api.config';

export const authRequestInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenService = inject(AuthTokenService);
    const loaderService = inject(LoaderService);
    const skipLoader = req.headers.get('skip-loader') === 'true';
    const skipAuthHeader = req.headers.get('skip-auth') === 'true';
    const isPublicPath = PUBLIC_API_PATHS.some((path) => req.url.includes(path));

    if (!skipLoader) {
        loaderService.show();
    }

    let headers = req.headers.set('Accept', 'application/json');

    if (!skipAuthHeader && !isPublicPath) {
        const accessToken = tokenService.getAccessToken();
        const userId = tokenService.getUserId();

        if (accessToken) {
            headers = headers.set('Authorization', `Bearer ${accessToken}`);
        }

        if (userId) {
            headers = headers.set('X-User-Id', userId);
        }
    }

    if (req.body instanceof FormData) {
        headers = headers.delete('Content-Type');
    }

    const authenticatedRequest = req.clone({ headers });
    return next(authenticatedRequest).pipe(
        finalize(() => {
            if (!skipLoader) {
                loaderService.hide();
            }
        })
    );
};
