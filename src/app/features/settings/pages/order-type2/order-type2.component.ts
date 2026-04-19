import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-order-type2',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="p-4"><h3 class="text-xl font-semibold mb-3">Order Type 2</h3><p class="text-color-secondary">Order Type 2 settings will be configured here.</p></div>`
})
export class OrderType2Component { }
