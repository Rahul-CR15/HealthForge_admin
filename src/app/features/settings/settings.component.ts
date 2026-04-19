import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';

interface SettingsTab {
    header: string;
    route: string;
    icon?: string;
}

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule, RouterModule, PopoverModule, ButtonModule],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
    @ViewChild('tabsContainer') tabsContainer!: ElementRef;
    
    activeIndex = 0;
    tabs: SettingsTab[] = [];
    
    private readonly allTabs: SettingsTab[] = [
        { header: 'Master Order',      route: '/settings/master-order',      icon: 'pi pi-box' },
        { header: 'Order Type 1',      route: '/settings/ordertype1',        icon: 'pi pi-tag' },
        { header: 'Order Type 2',      route: '/settings/ordertype2',        icon: 'pi pi-tags' },
        { header: 'Order Type 3',      route: '/settings/ordertype3',        icon: 'pi pi-bookmark' },
        { header: 'Facility',          route: '/settings/facility',          icon: 'pi pi-building' },
        { header: 'Inventory',         route: '/settings/inventory',         icon: 'pi pi-server' },
        { header: 'Medical History',   route: '/settings/medical-history',   icon: 'pi pi-history' },
        { header: 'Category',          route: '/settings/category',          icon: 'pi pi-sitemap' },
        { header: 'Form Document',     route: '/settings/form-document',     icon: 'pi pi-file' },
        { header: 'Campaign Template', route: '/settings/campaign-template', icon: 'pi pi-bullhorn' },
        { header: 'Complaints',        route: '/settings/complaints',        icon: 'pi pi-exclamation-circle' },
        { header: 'Diagnosis',         route: '/settings/diagnosis',         icon: 'pi pi-check-square' },
        { header: 'Doctor Type',       route: '/settings/doctor-type',       icon: 'pi pi-user' }
    ];

    constructor(private router: Router) {}

    ngOnInit(): void {
        this.buildTabs();
        this.syncActiveTabFromRoute();
        
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.syncActiveTabFromRoute();
        });
    }

    private buildTabs(): void {
        this.tabs = this.allTabs;
    }

    private syncActiveTabFromRoute(): void {
        const currentUrl = this.router.url;
        const idx = this.tabs.findIndex(tab =>
            currentUrl.includes(tab.route.split('/').pop() ?? '')
        );
        this.activeIndex = idx !== -1 ? idx : 0;

        if (idx === -1 && this.tabs.length > 0 && currentUrl.endsWith('/settings')) {
            this.router.navigate([this.tabs[0].route]);
            return;
        }

        // Auto-scroll active tab into view
        setTimeout(() => this.scrollToActiveTab(), 100);
    }

    shiftTabs(direction: number) {
        const scrollAmount = 300;
        this.tabsContainer.nativeElement.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }

    private scrollToActiveTab() {
        if (!this.tabsContainer) return;
        const activeElement = this.tabsContainer.nativeElement.querySelector('.tab-button.active');
        if (activeElement) {
            activeElement.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }

    navigateToTab(tab: SettingsTab, popover?: any) {
        if (popover) {
            popover.hide();
        }
        this.router.navigate([tab.route]);
    }
}
