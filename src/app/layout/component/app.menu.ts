import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule
    ],
    templateUrl: './app.menu.html',
    styleUrl: './app.menu.scss'
})
export class AppMenu implements OnInit {
    constructor(private auth: AuthService) { }

    ngOnInit() {
        // no role-based menu needed
    }
}
