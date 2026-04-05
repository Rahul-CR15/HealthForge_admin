import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { Company } from '@/core/models/company.model';
import { CompanyService } from './company.service';

@Component({
    selector: 'app-company-master',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ButtonModule,
        TableModule,
        DialogModule,
        InputTextModule,
        PasswordModule,
        ToastModule
    ],
    providers: [MessageService],
    templateUrl: './company-master.component.html'
})
export class CompanyMasterComponent {
    companies = signal<Company[]>([]);
    sidebarVisible = false;
    editing = signal<Company>({
        id: 0,
        companyName: '',
        firstName: '',
        middleName: '',
        lastName: '',
        openingHr: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        email: '',
        password: '',
        phone: '',
        phoneCode: ''
    });
    isNew = signal(true);

    constructor(
        private companyService: CompanyService,
        private messageService: MessageService
    ) {
        this.companies = this.companyService.list();
    }

    openNew() {
        this.isNew.set(true);
        this.editing.set({
            id: 0,
            companyName: '',
            firstName: '',
            middleName: '',
            lastName: '',
            openingHr: '',
            address: '',
            city: '',
            state: '',
            zipcode: '',
            email: '',
            password: '',
            phone: '',
            phoneCode: ''
        });
        this.sidebarVisible = true;
    }

    editCompany(c: Company) {
        this.isNew.set(false);
        this.editing.set({ ...c });
        this.sidebarVisible = true;
    }

    deleteCompany(c: Company) {
        this.companyService.remove(c.id);
        this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Company removed' });
    }

    save() {
        const comp = this.editing();
        const payload: Omit<Company, 'id'> = {
            companyName: comp.companyName,
            firstName: comp.firstName,
            middleName: comp.middleName,
            lastName: comp.lastName,
            openingHr: comp.openingHr,
            address: comp.address,
            city: comp.city,
            state: comp.state,
            zipcode: comp.zipcode,
            email: comp.email,
            password: comp.password,
            phone: comp.phone,
            phoneCode: comp.phoneCode
        };
        if (this.isNew()) {
            this.companyService.add(payload);
            this.messageService.add({ severity: 'success', summary: 'Created', detail: 'Company added' });
        } else {
            this.companyService.update(comp as Company);
            this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Company updated' });
        }
        this.sidebarVisible = false;
    }

    cancel() {
        this.sidebarVisible = false;
    }
}
