import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-setting-row',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
      <div class="flex flex-col gap-1">
        <span class="text-sm font-semibold text-gray-900">{{ label }}</span>
        <span class="text-xs text-gray-500 leading-relaxed">{{ description }}</span>
      </div>
      <div class="flex items-center min-w-[200px] justify-end">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class SettingRowComponent {
  @Input() label: string = '';
  @Input() description: string = '';
}
