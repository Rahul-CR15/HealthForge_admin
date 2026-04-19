import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { AuthGuard } from './app/core/guards/auth.guard';
import { DashboardComponent } from './app/features/dashboard/dashboard.component';

export const appRoutes: Routes = [
    // public routes
    { path: 'login', loadComponent: () => import('./app/features/auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'signup', loadComponent: () => import('./app/features/auth/signup/signup.component').then(m => m.SignupComponent) },

    // protect everything behind layout
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'company', loadComponent: () => import('./app/features/company/company.component').then(m => m.CompanyComponent) },
            { path: 'settings', loadChildren: () => import('./app/features/settings/settings.routes').then(m => m.settingsRoutes) }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
