import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-doctor-type',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="p-4"><h3 class="text-xl font-semibold mb-3">Doctor Type</h3><p class="text-color-secondary">Doctor Type settings will be configured here.</p></div>`
})
export class DoctorTypeComponent { }
