export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: ApiError;
    message?: string;
}
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, any>;
}
export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        total_pages: number;
        has_next: boolean;
        has_prev: boolean;
    };
}
export interface PaginationParams {
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
}
export interface FilterParams {
    search?: string;
    status?: string;
    date_from?: string;
    date_to?: string;
    created_by?: string;
}
export interface HealthCheckResponse {
    status: 'healthy' | 'unhealthy';
    timestamp: string;
    version: string;
    services: {
        database: 'healthy' | 'unhealthy';
        ai_services: 'healthy' | 'unhealthy';
        storage: 'healthy' | 'unhealthy';
    };
}
//# sourceMappingURL=api.d.ts.map