import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-form-document',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="p-4"><h3 class="text-xl font-semibold mb-3">Form Document</h3><p class="text-color-secondary">Form Document settings will be configured here.</p></div>`
})
export class FormDocumentComponent { }
