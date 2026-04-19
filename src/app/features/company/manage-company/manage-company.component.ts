import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CompanyService } from '../company.service';
import { Company } from '@/core/models/company.model';

@Component({
    selector: 'app-manage-company',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, PasswordModule],
    templateUrl: './manage-company.component.html',
    styleUrl: './manage-company.component.scss'
})
export class ManageCompanyComponent implements OnInit {
    editing: Company = {
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
        phoneCode: '',
        phone: ''
    };
    isNew = true;

    constructor(
        private companyService: CompanyService,
        public ref: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) { }

    ngOnInit() {
        if (this.config.data?.recordId) {
            const id = this.config.data.recordId;
            const existing = this.companyService.list()().find(c => c.id === id);
            if (existing) {
                this.editing = { ...existing };
                this.isNew = false;
            }
        }
    }

    save() {
        if (this.isNew) {
            const { id, ...newCompany } = this.editing;
            this.companyService.add(newCompany);
        } else {
            this.companyService.update(this.editing);
        }
        this.ref.close(true);
    }

    close() {
        this.ref.close();
    }
}
