export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    isActive: boolean;
    phone?: string;
    createdAt?: string;
}

export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    password: string;
}

export interface UpdateUserRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    password?: string;
}

export interface UserQueryParams extends Record<string, string | number | boolean | undefined> {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
