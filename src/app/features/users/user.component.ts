import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { UserFacade } from './user.facade';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [CommonModule, FormsModule, ButtonModule, InputTextModule, TableModule, ProgressSpinnerModule, CardModule, MessageModule],
    template: `
        <div class="p-4">
            <div class="p-card p-mb-4">
                <div class="flex flex-wrap gap-3 align-items-center mb-4">
                    <span class="p-input-icon-left">
                        <i class="pi pi-search"></i>
                        <input
                            pInputText
                            type="text"
                            [(ngModel)]="searchTerm"
                            (ngModelChange)="onSearch($event)"
                            placeholder="Search users"
                            class="w-full md:w-20rem"
                        />
                    </span>
                    <button pButton type="button" label="Refresh" icon="pi pi-refresh" (click)="loadUsers()"></button>
                </div>
                <p-message *ngIf="error()" severity="error" text="{{ error()?.message }}"></p-message>
                <p-progressSpinner *ngIf="loading()" styleClass="block m-auto"></p-progressSpinner>
            </div>

            <p-card *ngIf="!loading()">
                <p-table [value]="users()" [paginator]="true" [rows]="10" [showCurrentPageReport]="true" [rowsPerPageOptions]="[10, 20, 50]">
                    <ng-template pTemplate="header">
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-user>
                        <tr>
                            <td>{{ user.firstName }} {{ user.lastName }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                            <td>{{ user.isActive ? 'Active' : 'Inactive' }}</td>
                        </tr>
                    </ng-template>
                </p-table>
            </p-card>
        </div>
    `
})
export class UserComponent implements OnInit, OnDestroy {
    searchTerm = '';
    private searchSubject = new Subject<string>();
    private searchSubscription = new Subscription();

    constructor(private userFacade: UserFacade) {}

    get users() {
        return this.userFacade.users;
    }

    get loading() {
        return this.userFacade.loading;
    }

    get error() {
        return this.userFacade.error;
    }

    ngOnInit(): void {
        this.loadUsers();
        this.searchSubscription = this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((query) => {
            this.userFacade.loadUsers({ search: query, page: 1, pageSize: 10 });
        });
    }

    loadUsers(): void {
        this.userFacade.loadUsers({ page: 1, pageSize: 10 });
    }

    onSearch(query: string): void {
        this.searchSubject.next(query);
    }

    ngOnDestroy(): void {
        this.searchSubscription.unsubscribe();
    }
}
