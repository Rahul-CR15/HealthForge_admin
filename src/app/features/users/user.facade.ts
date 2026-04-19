import { Injectable, signal } from '@angular/core';
import { first, finalize } from 'rxjs/operators';
import { normalizeApiError } from '@/core/utils/api.utils';
import { ApiError } from '@/core/models/api.model';
import { NotificationService } from '@/shared/ui-services/notification.service';
import { CreateUserRequest, UpdateUserRequest, User, UserQueryParams } from './user.model';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserFacade {
    private readonly _users = signal<User[]>([]);
    private readonly _totalCount = signal(0);
    private readonly _loading = signal(false);
    private readonly _error = signal<ApiError | null>(null);

    readonly users = this._users;
    readonly totalCount = this._totalCount;
    readonly loading = this._loading;
    readonly error = this._error;

    constructor(private userService: UserService, private notificationService: NotificationService) {}

    loadUsers(query?: UserQueryParams): void {
        this._loading.set(true);
        this._error.set(null);

        this.userService
            .list(query)
            .pipe(
                first(),
                finalize(() => this._loading.set(false))
            )
            .subscribe({
                next: (response) => {
                    this._users.set(response.data);
                    this._totalCount.set(response.totalCount ?? response.data.length);
                },
                error: (error) => {
                    const apiError = normalizeApiError(error);
                    this._error.set(apiError);
                    this.notificationService.showError(apiError.message);
                }
            });
    }

    createUser(payload: CreateUserRequest): void {
        this._loading.set(true);
        this._error.set(null);

        this.userService
            .create(payload)
            .pipe(
                first(),
                finalize(() => this._loading.set(false))
            )
            .subscribe({
                next: (result) => {
                    this._users.update((users) => [result.data, ...users]);
                    this._totalCount.update((count) => count + 1);
                    this.notificationService.showSuccess('User created', result.message);
                },
                error: (error) => {
                    const apiError = normalizeApiError(error);
                    this._error.set(apiError);
                    this.notificationService.showError(apiError.message);
                }
            });
    }

    updateUser(id: string, payload: UpdateUserRequest): void {
        this._loading.set(true);
        this._error.set(null);

        this.userService
            .update(id, payload)
            .pipe(
                first(),
                finalize(() => this._loading.set(false))
            )
            .subscribe({
                next: (result) => {
                    this._users.update((users) => users.map((user) => (user.id === id ? result.data : user)));
                    this.notificationService.showSuccess('User updated', result.message);
                },
                error: (error) => {
                    const apiError = normalizeApiError(error);
                    this._error.set(apiError);
                    this.notificationService.showError(apiError.message);
                }
            });
    }

    deleteUser(id: string): void {
        this._loading.set(true);
        this._error.set(null);

        this.userService
            .delete(id)
            .pipe(
                first(),
                finalize(() => this._loading.set(false))
            )
            .subscribe({
                next: () => {
                    this._users.update((users) => users.filter((user) => user.id !== id));
                    this._totalCount.update((count) => Math.max(0, count - 1));
                    this.notificationService.showSuccess('User removed', 'User was deleted successfully.');
                },
                error: (error) => {
                    const apiError = normalizeApiError(error);
                    this._error.set(apiError);
                    this.notificationService.showError(apiError.message);
                }
            });
    }

    clearError(): void {
        this._error.set(null);
    }
}
