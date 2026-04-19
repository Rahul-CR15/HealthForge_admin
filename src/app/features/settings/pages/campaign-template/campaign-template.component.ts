import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-campaign-template',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="p-4"><h3 class="text-xl font-semibold mb-3">Campaign Template</h3><p class="text-color-secondary">Campaign Template settings will be configured here.</p></div>`
})
export class CampaignTemplateComponent { }
