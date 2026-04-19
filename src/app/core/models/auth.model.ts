export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    userId: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}
