import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

interface Credentials {
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private tokenService: TokenService, private router: Router) { }

    /**
     * Simple demo login that only checks password and email domain.
     */
    login(credentials: Credentials): boolean {
        const { email, password } = credentials;

        // Strict demo validation
        if (password !== 'Admin@123') {
            return false;
        }

        const emailLower = email.toLowerCase();
        if (!emailLower.endsWith('@healthforge.com')) {
            return false;
        }

        // store a token and email - no role logic anymore
        this.tokenService.storeToken('demo-token-' + Date.now());
        this.tokenService.storeEmail(email);
        this.router.navigate(['/dashboard']);
        return true;
    }

    logout(): void {
        this.tokenService.clear();
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return !!this.tokenService.getToken();
    }

    getUserEmail(): string | null {
        return this.tokenService.getEmail();
    }

    getToken(): string | null {
        return this.tokenService.getToken();
    }
}
