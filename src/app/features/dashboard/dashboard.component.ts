import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="p-4">
            <h1 class="text-3xl font-bold mb-4">Company Dashboard</h1>
            <div class="card">
                <p>Welcome to the company dashboard. Only core menu items are shown.</p>
            </div>
        </div>
    `
})
export class DashboardComponent {}