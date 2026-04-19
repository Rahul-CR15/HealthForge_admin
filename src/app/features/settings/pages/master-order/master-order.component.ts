import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ManageMasterOrderComponent } from './manage-master-order/manage-master-order.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-master-order',
    standalone: true,
    imports: [CommonModule, RippleModule],
    providers: [DialogService],
    templateUrl: './master-order.component.html'
})
export class MasterOrderComponent implements OnInit {
    orderCategoryList: any[] = [];
    ref: DynamicDialogRef | undefined;

    constructor(private dialogService: DialogService) { }

    ngOnInit(): void {
        this.orderCategoryList = [
            { id: 1, name: 'Laboratory' },
            { id: 2, name: 'Imaging' },
            { id: 3, name: 'Procedure' },
            { id: 4, name: 'Medication' },
            { id: 5, name: 'Vaccination' },
            { id: 6, name: 'Consultation' },
            { id: 7, name: 'Nursing' },
            { id: 8, name: 'Physiotherapy' }
        ];
    }

    openOrderDetail(item: any): void {
        this.ref = this.dialogService.open(ManageMasterOrderComponent, {
            header: '',
            width: '55vw',
            styleClass: 'right-model',
            showHeader: false,
            closable: false,
            transitionOptions: '150ms',
            data: { category: item }
        });

        this.ref.onClose.subscribe((result: any) => {
            if (result) {
                // handle any return data if needed
            }
        });
    }
}

