import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { LayoutService } from '../service/layout.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        AppMenuitem
    ],
    templateUrl: './app.menu.html',
    styleUrl: './app.menu.scss'
})
export class AppMenu implements OnInit {
    model: MenuItem[] = [];

    constructor(
        private auth: AuthService,
        public layoutService: LayoutService
    ) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Main',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
                    { label: 'Companies', icon: 'pi pi-fw pi-building', routerLink: ['/company'] },
                    { label: 'Settings', icon: 'pi pi-fw pi-cog', routerLink: ['/settings'] }
                ]
            }
        ];
    }
}
