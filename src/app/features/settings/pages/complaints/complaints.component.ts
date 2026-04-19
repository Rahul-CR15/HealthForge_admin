import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-complaints-settings',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="p-4"><h3 class="text-xl font-semibold mb-3">Complaints</h3><p class="text-color-secondary">Complaints settings will be configured here.</p></div>`
})
export class ComplaintsComponent { }
