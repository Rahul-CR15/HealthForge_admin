import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-facility',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="p-4"><h3 class="text-xl font-semibold mb-3">Facility</h3><p class="text-color-secondary">Facility settings will be configured here.</p></div>`
})
export class FacilityComponent { }
