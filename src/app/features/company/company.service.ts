import { Injectable, signal } from '@angular/core';
import { Company } from '@/core/models/company.model';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private companies = signal<Company[]>([]);
    private nextId = 1;

    list() {
        return this.companies;
    }

    add(company: Omit<Company, 'id'>) {
        const newCompany: Company = { ...company, id: this.nextId++ };
        this.companies.update((c) => [...c, newCompany]);
    }

    update(updated: Company) {
        this.companies.update((c) => c.map((x) => (x.id === updated.id ? updated : x)));
    }

    remove(id: number) {
        this.companies.update((c) => c.filter((x) => x.id !== id));
    }
} 