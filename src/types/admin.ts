
export interface BookItem {
    bookId: number;
    title: string;
    authors: string[];
    isbn: string;
    createdAt: string;
    status: string;
    count: number;
    isRecommended: boolean; // ✅ 프론트 전용 필드
}

export interface PageInfo {
    page: number;
    size: number;
    totalPages: number;
    totalCount: number;
}

export interface CreateBookFormData {
    title: string;
    contents: string;
    isbn: string;
    publishedAt: string;
    authors: string; // comma-separated
    translators: string; // comma-separated
    publisher: string;
    price: string;
    salePrice: string;
    count: string;
    thumbnail: string;
    status: string;
}