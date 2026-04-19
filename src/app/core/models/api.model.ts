export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    totalCount?: number;
}

export interface ApiError {
    message: string;
    statusCode: number;
    errors?: string[];
}

export interface PaginatedQuery {
    page?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
