import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BaseApiService, RequestOptions } from './base-api.service';
import { AuthTokenService } from './auth-token.service';
import { AuthTokens, LoginRequest, RefreshTokenRequest } from '../models/auth.model';
import { ApiResponse } from '../models/api.model';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    private readonly authOptions: RequestOptions = {
        headers: {
            'skip-auth': 'true'
        },
        skipAuth: true
    };

    constructor(
        private baseApi: BaseApiService,
        private tokenStorage: AuthTokenService,
        private router: Router
    ) {}

    login(credentials: LoginRequest) {
        return this.baseApi.post<AuthTokens>('/login', credentials, this.authOptions, 'authApi').pipe(
            tap((response: ApiResponse<AuthTokens>) => {
                this.tokenStorage.storeTokens(response.data);
            })
        );
    }

    refreshSession() {
        const payload: RefreshTokenRequest = {
            refreshToken: this.tokenStorage.getRefreshToken() ?? ''
        };

        return this.baseApi.post<AuthTokens>('/refresh', payload, this.authOptions, 'authApi').pipe(
            tap((response: ApiResponse<AuthTokens>) => {
                this.tokenStorage.storeTokens(response.data);
            })
        );
    }

    logout() {
        this.tokenStorage.clear();
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!this.tokenStorage.getAccessToken() && !this.tokenStorage.isAccessTokenExpired();
    }
}
