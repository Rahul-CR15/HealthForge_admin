import { Injectable } from '@angular/core';
import { AuthTokens } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthTokenService {
    private readonly ACCESS_TOKEN_KEY = 'hf_access_token';
    private readonly REFRESH_TOKEN_KEY = 'hf_refresh_token';
    private readonly USER_ID_KEY = 'hf_user_id';
    private readonly EXPIRES_AT_KEY = 'hf_token_expires_at';

    storeTokens(tokens: AuthTokens): void {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
        localStorage.setItem(this.USER_ID_KEY, tokens.userId);
        localStorage.setItem(this.EXPIRES_AT_KEY, String(Date.now() + tokens.expiresIn * 1000));
    }

    getAccessToken(): string | null {
        return localStorage.getItem(this.ACCESS_TOKEN_KEY);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    }

    getUserId(): string | null {
        return localStorage.getItem(this.USER_ID_KEY);
    }

    getExpiration(): number | null {
        const expiresAt = localStorage.getItem(this.EXPIRES_AT_KEY);
        return expiresAt ? Number(expiresAt) : null;
    }

    isAccessTokenExpired(): boolean {
        const expiration = this.getExpiration();
        return expiration === null || Date.now() >= expiration;
    }

    clear(): void {
        localStorage.removeItem(this.ACCESS_TOKEN_KEY);
        localStorage.removeItem(this.REFRESH_TOKEN_KEY);
        localStorage.removeItem(this.USER_ID_KEY);
        localStorage.removeItem(this.EXPIRES_AT_KEY);
    }
}
