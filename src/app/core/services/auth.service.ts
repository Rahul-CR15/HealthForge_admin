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
     * Static demo login for the Super Admin account.
     */
    login(credentials: Credentials): boolean {
        const { email, password } = credentials;

        const normalizedEmail = email.trim().toLowerCase();
        if (normalizedEmail !== 'superadmin@gmail.com' || password !== 'Admin@123') {
            return false;
        }

        // store a token and email - no role logic anymore
        this.tokenService.storeToken('demo-token-' + Date.now());
        this.tokenService.storeEmail(normalizedEmail);
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
