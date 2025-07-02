
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
