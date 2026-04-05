import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-global-footer',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './global-footer.component.html',
    styles: [`
        .shadow-up {
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        }
    `]
})
export class GlobalFooterComponent {
    currentYear = new Date().getFullYear();
}
