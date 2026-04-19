import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, filter, map, shareReplay, take, tap } from 'rxjs/operators';
import { API_BASE_URLS } from '../config/api.config';
import { AuthTokenService } from './auth-token.service';
import { AuthTokens } from '../models/auth.model';
import { ApiResponse } from '../models/api.model';

@Injectable({
    providedIn: 'root'
})
export class RefreshTokenService {
    private refreshInProgress = false;
    private refreshResult = new BehaviorSubject<AuthTokens | null>(null);
    private readonly http: HttpClient;

    constructor(private tokenStorage: AuthTokenService, httpBackend: HttpBackend) {
        this.http = new HttpClient(httpBackend);
    }

    refreshToken(): Observable<AuthTokens> {
        const refreshToken = this.tokenStorage.getRefreshToken();
        if (!refreshToken) {
            return throwError(() => new Error('Refresh token is missing'));
        }

        if (this.refreshInProgress) {
            return this.refreshResult.pipe(
                filter((token): token is AuthTokens => token !== null),
                take(1)
            );
        }

        this.refreshInProgress = true;
        this.refreshResult.next(null);

        const refresh$ = this.http
            .post<ApiResponse<AuthTokens>>(`${API_BASE_URLS.authApi.replace(/\/$/, '')}/refresh`, {
                refreshToken
            })
            .pipe(
                map((response) => response.data),
                tap((tokens) => this.tokenStorage.storeTokens(tokens)),
                tap((tokens) => this.refreshResult.next(tokens)),
                catchError((error) => {
                    this.tokenStorage.clear();
                    return throwError(() => error);
                }),
                finalize(() => {
                    this.refreshInProgress = false;
                }),
                shareReplay({ bufferSize: 1, refCount: true })
            );

        refresh$.subscribe({
            error: () => this.refreshResult.next(null)
        });

        return refresh$;
    }
}
