import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '@/core/models/api.model';
import { BaseApiService } from '@/core/services/base-api.service';
import { CreateUserRequest, UpdateUserRequest, User, UserQueryParams } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private baseApi: BaseApiService) {}

    list(params?: UserQueryParams): Observable<ApiResponse<User[]>> {
        return this.baseApi.get<User[]>('/users', {
            params,
            cache: true,
            cacheTTL: 300_000,
            retry: { count: 2, delayMs: 400 }
        }, 'commonApi');
    }

    details(id: string): Observable<ApiResponse<User>> {
        return this.baseApi.get<User>(`/users/${id}`, {}, 'commonApi');
    }

    create(payload: CreateUserRequest): Observable<ApiResponse<User>> {
        return this.baseApi.post<User>('/users', payload, {}, 'commonApi');
    }

    update(id: string, payload: UpdateUserRequest): Observable<ApiResponse<User>> {
        return this.baseApi.put<User>(`/users/${id}`, payload, {}, 'commonApi');
    }

    delete(id: string): Observable<ApiResponse<void>> {
        return this.baseApi.delete<void>(`/users/${id}`, {}, 'commonApi');
    }

    uploadAvatar(userId: string, formData: FormData) {
        return this.baseApi.upload<{ imageUrl: string }>(`/users/${userId}/avatar`, formData, {}, 'commonApi');
    }
}
