import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';
import { LayoutService } from '../service/layout.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [AppMenu, CommonModule],
    templateUrl: './app.sidebar.html'
})
export class AppSidebar {
    constructor(public el: ElementRef, public layoutService: LayoutService) { }
}
