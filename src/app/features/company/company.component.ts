import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DynamicDialogModule, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { Company } from '@/core/models/company.model';
import { CompanyService } from './company.service';
import { ManageCompanyComponent } from './manage-company/manage-company.component';

@Component({
    selector: 'app-company',
    standalone: true,
    imports: [
        CommonModule,
        ButtonModule,
        TableModule,
        ToastModule,
        DynamicDialogModule
    ],
    providers: [MessageService, DialogService],
    templateUrl: './company.component.html'
})
export class CompanyComponent {
    companies = signal<Company[]>([]);
    ref: DynamicDialogRef | undefined;

    constructor(
        private companyService: CompanyService,
        private messageService: MessageService,
        public dialogService: DialogService
    ) {
        this.companies = this.companyService.list();
    }

    openNew() {
        this.openManageDialog(null);
    }

    editCompany(c: Company) {
        this.openManageDialog(c.id);
    }

    private openManageDialog(recordId: number | null) {
        this.ref = this.dialogService.open(ManageCompanyComponent, {
            header: '',
            width: '50vw',
            styleClass: 'right-model',
            showHeader: false,
            closable: false,
            transitionOptions: '0ms',
            data: { recordId: recordId }
        });

        this.ref.onClose.subscribe((result: any) => {
            if (result) {
                const summary = recordId ? 'Updated' : 'Created';
                const detail = recordId ? 'Company updated' : 'Company added';
                this.messageService.add({ severity: 'success', summary, detail });
            }
        });
    }

    deleteCompany(c: Company) {
        this.companyService.remove(c.id);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Company removed' });
    }
}
