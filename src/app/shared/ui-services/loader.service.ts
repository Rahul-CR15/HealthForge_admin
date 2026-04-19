import { Injectable, computed, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private readonly activeRequests = signal(0);
    readonly isLoading = computed(() => this.activeRequests() > 0);

    show(): void {
        this.activeRequests.update((current) => current + 1);
    }

    hide(): void {
        this.activeRequests.update((current) => Math.max(0, current - 1));
    }

    reset(): void {
        this.activeRequests.set(0);
    }
}
