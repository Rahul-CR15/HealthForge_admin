import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageOrderTypeComponent } from './manage-order-type/manage-order-type.component';

@Component({
  selector: 'app-order-type',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    SelectModule,
    SkeletonModule,
    PaginatorModule,
    RippleModule,
    DynamicDialogModule
  ],
  providers: [DialogService, ConfirmationService],
  templateUrl: './order-type.component.html'
})
export class OrderTypeComponent implements OnInit {
  totalCount = 0;
  itemList: any[] = [];
  allItems: any[] = [];
  isLoading = false;
  limit = 10;
  pageIndex = 1;
  pageLimit: number[] = [10, 20, 50];
  searchText: string | null = null;
  orderCategoryId: number | null = null;
  orderCategoryList: any[] = [
    { id: 1, name: 'Laboratory' },
    { id: 2, name: 'Imaging' },
    { id: 3, name: 'Procedure' },
    { id: 4, name: 'Medication' },
    { id: 5, name: 'Vaccination' },
    { id: 6, name: 'Consultation' },
    { id: 7, name: 'Nursing' },
    { id: 8, name: 'Physiotherapy' }
  ];
  activeIndex = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    const data: any = this.route.snapshot.data;
    const orderType = data['orderType'];
    if (orderType) {
      this.activeIndex = Number(orderType);
    } else if (this.router.url.includes('ordertype2')) {
      this.activeIndex = 2;
    } else if (this.router.url.includes('ordertype3')) {
      this.activeIndex = 3;
    }

    this.initializeItems();
    this.getItemsList();
  }

  initializeItems() {
    this.allItems = [
      {
        id: 1,
        orderType: 1,
        name: 'Blood Test',
        orderCategoryId: 1,
        orderCategoryName: 'Laboratory'
      },
      {
        id: 2,
        orderType: 1,
        name: 'Urine Analysis',
        orderCategoryId: 1,
        orderCategoryName: 'Laboratory'
      },
      {
        id: 3,
        orderType: 2,
        name: 'X-Ray',
        orderCategoryId: 2,
        orderCategoryName: 'Imaging',
        code: 'XR01',
        cptCode: 'CPT1001'
      },
      {
        id: 4,
        orderType: 2,
        name: 'MRI Scan',
        orderCategoryId: 2,
        orderCategoryName: 'Imaging',
        code: 'MRI02',
        cptCode: 'CPT1002'
      },
      {
        id: 5,
        orderType: 3,
        name: 'Surgery Consultation',
        orderCategoryId: 6,
        orderCategoryName: 'Consultation'
      },
      {
        id: 6,
        orderType: 3,
        name: 'Rehabilitation Plan',
        orderCategoryId: 8,
        orderCategoryName: 'Physiotherapy'
      }
    ];
  }

  searchByText() {
    this.getItemsList();
  }

  getItemsList() {
    this.isLoading = true;

    const filtered = this.allItems.filter(item => {
      const matchesType = item.orderType === this.activeIndex;
      const matchesCategory = this.orderCategoryId ? item.orderCategoryId === this.orderCategoryId : true;
      const matchesSearch = this.searchText
        ? item.name.toLowerCase().includes(this.searchText.toLowerCase())
        : true;
      return matchesType && matchesCategory && matchesSearch;
    });

    this.totalCount = filtered.length;
    this.itemList = filtered.slice((this.pageIndex - 1) * this.limit, this.pageIndex * this.limit);
    this.isLoading = false;
  }

  changePage(event: any) {
    this.pageIndex = event.page + 1;
    this.limit = event.rows;
    this.getItemsList();
  }

  openModal(item: any) {
    this.dialogService
      .open(ManageOrderTypeComponent, {
        width: '50vw',
        styleClass: 'right-model',
        transitionOptions: '0ms',
        closable: false,
        showHeader: false,
        data: { orderType: this.activeIndex, item }
      })
      .onClose.subscribe((res: any) => {
        if (res?.isRefresh) {
          this.updateLocalItem(res.obj);
        }
      });
  }

  deleteItem(item: any) {
    this._confirmationService.confirm({
      message: 'Are you sure you want to remove this item?',
      header: 'Delete Confirmation!',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      acceptButtonStyleClass: 'black-btn',
      rejectButtonStyleClass: 'p-button-secondary p-button-text',
      acceptIcon: 'pi',
      rejectIcon: 'pi',
      accept: () => {
        this.allItems = this.allItems.filter(i => i.id !== item.id || i.orderType !== this.activeIndex);
        this.getItemsList();
      },
      reject: () => {}
    });
  }

  updateLocalItem(item: any) {
    if (!item) {
      return;
    }

    const existingIndex = this.allItems.findIndex(i => i.id === item.id && i.orderType === this.activeIndex);
    const transformed = {
      ...item,
      orderType: this.activeIndex,
      orderCategoryName: this.orderCategoryList.find(c => c.id === item.orderCategoryId)?.name ?? 'Unknown'
    };

    if (existingIndex >= 0) {
      this.allItems[existingIndex] = transformed;
    } else {
      transformed.id = this.allItems.length > 0 ? Math.max(...this.allItems.map(i => i.id)) + 1 : 1;
      this.allItems.unshift(transformed);
    }

    this.getItemsList();
  }
}
