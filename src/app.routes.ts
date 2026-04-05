import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AuthGuard } from './app/core/guards/auth.guard';
import { DashboardComponent } from './app/features/dashboard/dashboard.component';
import { CompanyMasterComponent } from './app/features/company-master/company-master.component';
import { LoginComponent } from './app/features/auth/login/login.component';
import { SignupComponent } from './app/features/auth/signup/signup.component';

export const appRoutes: Routes = [
    // public routes
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    // protect everything behind layout
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'company', component: CompanyMasterComponent }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
