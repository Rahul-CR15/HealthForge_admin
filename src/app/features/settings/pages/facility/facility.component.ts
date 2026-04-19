import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { RippleModule } from 'primeng/ripple';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ManageFacilityComponent } from './manage-facility/manage-facility.component';

interface FacilityItem {
  id: number;
  name: string;
  facilityTypeName: string;
  primaryContactName: string;
  address1: string;
}

interface FacilityWithCompanyItem extends FacilityItem {
  companyName: string;
}

@Component({
  selector: 'app-facility',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    TabsModule,
    TableModule,
    PaginatorModule,
    SkeletonModule,
    RippleModule,
    DynamicDialogModule
  ],
  providers: [DialogService],
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {
  searchText = '';
  activeIndex = 0;
  isLoading = false;

  limit = 5;
  pageIndex = 1;
  pageLimit = [5, 10, 20];

  withoutCompanyItems: FacilityItem[] = [
    {
      id: 1,
      name: 'Central Lab',
      facilityTypeName: 'Laboratory',
      primaryContactName: 'Dr. Lara James',
      address1: '1224 Eastway Drive, Seattle, WA'
    },
    {
      id: 2,
      name: 'Northpoint Clinic',
      facilityTypeName: 'Therapy Center',
      primaryContactName: 'Samuel King',
      address1: '1638 Maple Avenue, Austin, TX'
    },
    {
      id: 3,
      name: 'Wellness Hub',
      facilityTypeName: 'Pharmacy',
      primaryContactName: 'Maya Patel',
      address1: '894 Park Street, Boston, MA'
    }
  ];

  withCompanyItems: FacilityWithCompanyItem[] = [
    {
      id: 101,
      name: 'Southside Clinic',
      companyName: 'HealthCorp',
      facilityTypeName: 'Radiology',
      primaryContactName: 'Daniel Craig',
      address1: '3444 Lakeview Ave, Denver, CO'
    },
    {
      id: 102,
      name: 'Riverbend Center',
      companyName: 'CareBridge',
      facilityTypeName: 'Laboratory',
      primaryContactName: 'Nina Torres',
      address1: '71 Riverbend Road, Atlanta, GA'
    }
  ];

  filteredWithoutCompany: FacilityItem[] = [...this.withoutCompanyItems];
  filteredWithCompany: FacilityWithCompanyItem[] = [...this.withCompanyItems];

  cols = [1, 2, 3, 4, 5];

  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.applyFilters();
  }

  get currentItems() {
    return this.activeIndex === 1 ? this.filteredWithCompany : this.filteredWithoutCompany;
  }

  get totalCount() {
    return this.currentItems.length;
  }

  get currentPageItems() {
    const items = this.currentItems;
    const start = (this.pageIndex - 1) * this.limit;
    return items.slice(start, start + this.limit);
  }

  openModal(item?: any) {
    this.ref = this.dialogService.open(ManageFacilityComponent, {
      header: '',
      width: '42vw',
      styleClass: 'right-dialog right-model',
      showHeader: false,
      closable: false,
      transitionOptions: '150ms',
      data: { item }
    });

    this.ref.onClose.subscribe((result: any) => {
      if (result?.isRefresh) {
        this.applyFilters();
      }
    });
  }

  searchByText() {
    this.pageIndex = 1;
    this.applyFilters();
  }

  applyFilters() {
    const term = this.searchText?.trim().toLowerCase() || '';

    this.filteredWithoutCompany = this.withoutCompanyItems.filter(item => {
      return (
        item.name.toLowerCase().includes(term) ||
        item.facilityTypeName.toLowerCase().includes(term) ||
        item.primaryContactName.toLowerCase().includes(term) ||
        item.address1.toLowerCase().includes(term)
      );
    });

    this.filteredWithCompany = this.withCompanyItems.filter(item => {
      return (
        item.name.toLowerCase().includes(term) ||
        item.companyName.toLowerCase().includes(term) ||
        item.facilityTypeName.toLowerCase().includes(term) ||
        item.primaryContactName.toLowerCase().includes(term) ||
        item.address1.toLowerCase().includes(term)
      );
    });
  }

  changePage(event: any) {
    this.pageIndex = event.page + 1;
    this.limit = event.rows;
  }

  deleteItem(id: number) {
    if (this.activeIndex === 1) {
      this.withCompanyItems = this.withCompanyItems.filter(item => item.id !== id);
    } else {
      this.withoutCompanyItems = this.withoutCompanyItems.filter(item => item.id !== id);
    }

    this.applyFilters();
  }

  onTabChange(event: any) {
    this.activeIndex = event.index;
    this.pageIndex = 1;
  }
}
