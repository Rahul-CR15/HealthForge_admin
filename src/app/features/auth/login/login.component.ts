import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@/core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        RippleModule,
        CardModule
    ],
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    email = '';
    password = '';
    checked = false;
    error: string | null = null;

    constructor(private auth: AuthService, private router: Router) { }

    ngOnInit(): void {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['/dashboard']);
        }
    }


    onLogin(): void {
        const success = this.auth.login({ email: this.email, password: this.password });
        if (!success) {
            this.error = 'Invalid credentials. Please make sure you use the correct email and password.';
        }
    }
}
