import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@/core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'app-global-header',
    standalone: true,
    imports: [CommonModule, ButtonModule, TagModule],
    templateUrl: './global-header.component.html'
})
export class GlobalHeaderComponent {
    constructor(public auth: AuthService) { }
}
