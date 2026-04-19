import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, throwError, timer } from 'rxjs';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { API_BASE_URLS, ApiBaseUrlKey } from '../config/api.config';
import { ApiResponse } from '../models/api.model';
import { normalizeApiError } from '../utils/api.utils';

export interface RetryOptions {
    count: number;
    delayMs: number;
}

export interface RequestOptions {
    params?: Record<string, string | number | boolean | undefined>;
    headers?: Record<string, string>;
    cache?: boolean;
    cacheTTL?: number;
    retry?: RetryOptions;
    skipAuth?: boolean;
    skipLoader?: boolean;
}

interface CacheEntry<T> {
    expiresAt: number;
    observable: Observable<ApiResponse<T>>;
}

@Injectable({
    providedIn: 'root'
})
export class BaseApiService {
    private cache = new Map<string, CacheEntry<unknown>>();

    constructor(private http: HttpClient) {}

    get<T>(endpoint: string, options?: RequestOptions, baseUrlKey: ApiBaseUrlKey = 'commonApi'): Observable<ApiResponse<T>> {
        const url = this.buildUrl(endpoint, baseUrlKey);
        const params = this.buildParams(options?.params);
        const cacheKey = this.buildCacheKey(url, params);

        if (options?.cache) {
            const cached = this.cache.get(cacheKey) as CacheEntry<T> | undefined;
            if (cached && cached.expiresAt > Date.now()) {
                return cached.observable;
            }
        }

        const request$ = this.http
            .get<ApiResponse<T>>(url, {
                params,
                headers: this.buildHeaders(options?.headers)
            })
            .pipe(
                this.applyRetry<T>(options?.retry),
                shareReplay({ bufferSize: 1, refCount: true }),
                catchError((error): Observable<ApiResponse<T>> => throwError(() => normalizeApiError(error)))
            );

        if (options?.cache) {
            const expiresAt = Date.now() + (options.cacheTTL ?? 60_000);
            this.cache.set(cacheKey, { expiresAt, observable: request$ });
        }

        return request$;
    }

    post<T>(endpoint: string, body: unknown, options?: RequestOptions, baseUrlKey: ApiBaseUrlKey = 'commonApi'): Observable<ApiResponse<T>> {
        return this.request<T>('POST', endpoint, body, options, baseUrlKey);
    }

    put<T>(endpoint: string, body: unknown, options?: RequestOptions, baseUrlKey: ApiBaseUrlKey = 'commonApi'): Observable<ApiResponse<T>> {
        return this.request<T>('PUT', endpoint, body, options, baseUrlKey);
    }

    delete<T>(endpoint: string, options?: RequestOptions, baseUrlKey: ApiBaseUrlKey = 'commonApi'): Observable<ApiResponse<T>> {
        return this.http
            .delete<ApiResponse<T>>(this.buildUrl(endpoint, baseUrlKey), {
                params: this.buildParams(options?.params),
                headers: this.buildHeaders(options?.headers)
            })
            .pipe(
                this.applyRetry<T>(options?.retry),
                catchError((error): Observable<ApiResponse<T>> => throwError(() => normalizeApiError(error)))
            );
    }

    upload<T>(endpoint: string, formData: FormData, options?: RequestOptions, baseUrlKey: ApiBaseUrlKey = 'commonApi'): Observable<HttpEvent<ApiResponse<T>>> {
        return this.http.post<ApiResponse<T>>(this.buildUrl(endpoint, baseUrlKey), formData, {
            params: this.buildParams(options?.params),
            headers: this.buildHeaders(options?.headers),
            reportProgress: true,
            observe: 'events'
        });
    }

    private request<T>(
        method: 'POST' | 'PUT',
        endpoint: string,
        body: unknown,
        options: RequestOptions | undefined,
        baseUrlKey: ApiBaseUrlKey
    ): Observable<ApiResponse<T>> {
        return this.http
            .request<ApiResponse<T>>(method, this.buildUrl(endpoint, baseUrlKey), {
                body,
                params: this.buildParams(options?.params),
                headers: this.buildHeaders(options?.headers)
            })
            .pipe(
                this.applyRetry<T>(options?.retry),
                catchError((error): Observable<ApiResponse<T>> => throwError(() => normalizeApiError(error)))
            );
    }

    private buildUrl(endpoint: string, baseUrlKey: ApiBaseUrlKey): string {
        const baseUrl = API_BASE_URLS[baseUrlKey];
        return endpoint.startsWith('http')
            ? endpoint
            : `${baseUrl.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
    }

    private buildParams(params?: Record<string, string | number | boolean | undefined>): HttpParams {
        let httpParams = new HttpParams();
        Object.entries(params ?? {}).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                httpParams = httpParams.set(key, String(value));
            }
        });
        return httpParams;
    }

    private buildHeaders(customHeaders?: Record<string, string>): HttpHeaders {
        let headers = new HttpHeaders({ Accept: 'application/json' });
        Object.entries(customHeaders ?? {}).forEach(([key, value]) => {
            headers = headers.set(key, value);
        });
        return headers;
    }

    private applyRetry<T>(retryOptions?: RetryOptions): MonoTypeOperatorFunction<ApiResponse<T>> {
        if (!retryOptions?.count) {
            return (source: Observable<ApiResponse<T>>) => source;
        }

        return retry<ApiResponse<T>>({
            count: retryOptions.count,
            delay: () => timer(retryOptions.delayMs ?? 300)
        });
    }

    private buildCacheKey(url: string, params: HttpParams): string {
        return `${url}?${params.toString()}`;
    }
}
