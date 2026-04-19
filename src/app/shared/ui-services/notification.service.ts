import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export type NotificationSeverity = 'success' | 'info' | 'warn' | 'error';

export interface NotificationPayload {
    severity: NotificationSeverity;
    summary: string;
    detail?: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private readonly notifications = new Subject<NotificationPayload>();
    readonly notifications$: Observable<NotificationPayload> = this.notifications.asObservable();

    showSuccess(summary: string, detail?: string): void {
        this.notifications.next({ severity: 'success', summary, detail });
    }

    showInfo(summary: string, detail?: string): void {
        this.notifications.next({ severity: 'info', summary, detail });
    }

    showWarn(summary: string, detail?: string): void {
        this.notifications.next({ severity: 'warn', summary, detail });
    }

    showError(summary: string, detail?: string): void {
        this.notifications.next({ severity: 'error', summary, detail });
    }
}
