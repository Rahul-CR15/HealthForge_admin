import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-order-type1',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="p-4"><h3 class="text-xl font-semibold mb-3">Order Type 1</h3><p class="text-color-secondary">Order Type 1 settings will be configured here.</p></div>`
})
export class OrderType1Component { }
