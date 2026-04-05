import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AppTopbar } from '@/layout/component/app.topbar';
import { AppFooter } from '@/layout/component/app.footer';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        InputMaskModule,
        SelectModule,
        TextareaModule,
        CheckboxModule,
        ToastModule,
        AppTopbar,
        AppFooter
    ],
    providers: [MessageService],
    templateUrl: './signup.component.html'
})
export class SignupComponent {
    // Hospital Information
    hospitalName = '';
    hospitalEmail = '';
    hospitalPhone = '';
    hospitalType: any = null;
    registrationNumber = '';
    hospitalAddress = '';

    // Admin Information
    adminName = '';
    adminEmail = '';
    adminPhone = '';
    password = '';
    confirmPassword = '';
    gender: any = null;

    // System Setup
    timeZone: any = null;
    currency: any = null;
    subscriptionPlan: any = null;
    agreeTerms = false;

    // Options
    hospitalTypes = [
        { label: 'Clinic', value: 'clinic' },
        { label: 'Multi-Speciality', value: 'multi' },
        { label: 'Lab', value: 'lab' },
        { label: 'Dental', value: 'dental' }
    ];

    genders = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
    ];

    timeZones = [
        { label: '(GMT-05:00) Eastern Time', value: 'EST' },
        { label: '(GMT+00:00) UTC', value: 'UTC' },
        { label: '(GMT+05:30) India Standard Time', value: 'IST' }
    ];

    currencies = [
        { label: 'USD ($)', value: 'USD' },
        { label: 'EUR (€)', value: 'EUR' },
        { label: 'INR (₹)', value: 'INR' }
    ];

    subscriptionPlans = [
        { label: 'Basic', value: 'basic' },
        { label: 'Pro', value: 'pro' },
        { label: 'Enterprise', value: 'enterprise' }
    ];

    constructor(private router: Router, private messageService: MessageService) { }

    onSignup(): void {
        if (!this.agreeTerms) {
            this.messageService.add({ severity: 'warn', summary: 'Terms & Conditions', detail: 'Please agree to the terms and conditions.' });
            return;
        }

        this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: 'Hospital account created! Redirecting to login...'
        });

        setTimeout(() => {
            this.router.navigate(['/login']);
        }, 2000);
    }
}
