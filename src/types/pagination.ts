// src/types/pagination.ts
export interface Page<T> {
    content: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
export interface PageInfo {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

