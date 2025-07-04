
export interface BookItem {
    bookId: number;
    title: string;
    authors?: string[];
    isbn?: string;
    createdAt: string;
    status?: string;
    count: number;
    isRecommended: boolean; // ✅ 프론트 전용 필드
}

export interface BookDetail extends BookItem {
    contents?: string;
    translators?: string[];
    publishedAt?: string;
    publisher?: string;
    price?: number;
    salePrice?: number;
    thumbnail?: string;
}


export interface BookCreateRequest {
    title: string;
    contents?: string;
    isbn?: string;
    publishedAt?: string;
    authors?: string[]; // comma-separated
    translators?: string[]; // comma-separated
    publisher?: string;
    price?: number;
    salePrice?: number;
    count: number;
    thumbnail?: string;
    status?: string;
}

export interface BookUpdateRequest {
    title: string;
    contents?: string;
    isbn?:string;
    publishedAt?: string;
    authors?: string[]; // comma-separated
    translators?: string[]; // comma-separated
    publisher?: string;
    price?: number;
    salePrice?: number;
    count: number;
    thumbnail?:string;
    status?: string;
}