export const API_BASE_URLS = {
    authApi: 'https://api.healthforge.com/auth',
    commonApi: 'https://api.healthforge.com/common',
    clinicApi: 'https://api.healthforge.com/clinic',
    labApi: 'https://api.healthforge.com/lab'
} as const;

export type ApiBaseUrlKey = keyof typeof API_BASE_URLS;

export const PUBLIC_API_PATHS = ['/login', '/signup', '/public'];
