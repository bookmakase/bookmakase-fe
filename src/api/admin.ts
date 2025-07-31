// import { instance } from "@/lib/axios";
// import { api } from "@/constants/apiPath";
// import type { BookItem, BookDetail, BookCreateRequest, BookUpdateRequest } from '@/types/book';
// import type {RecommendationResponse} from '@/types/recommendation'
// import type { Page } from '@/types/pagination';


export async function fetchBooks(
    page: number = 0,
    size: number = 10
): Promise<Page<BookItem>> {
    try {
        const response = await instance.get<Page<BookItem>>(
            `${api.admin.books}`,
            {
                params: { page, size },
            }
        );
        return response.data;
    } catch (error) {
        console.error("도서 목록 조회 실패:", error);
        throw error;
    }
};

export async function createBook(
    data: BookCreateRequest
): Promise<BookItem> {
    try {
        const response = await instance.post<BookItem>(
            `${api.admin.books}`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("도서 등록 실패:", error);
        throw error;
    }
};

export async function updateBook(bookId: number, payload: BookUpdateRequest): Promise<BookDetail> {
    try {
        const res = await instance.put(`${api.admin.books}/${bookId}`, payload);

        return res.data;
    } catch (error) {
        console.error("도서 수정 실패:", error);
        throw error;
    }
};


export async function fetchBook(bookId: number): Promise<BookDetail> {
    try {
        const res = await instance.get(`${api.admin.books}/${bookId}`);
        return res.data;
    } catch (error) {
        console.error("도서 조회 실패:", error);
        throw error;
    }
};

export async function fetchRecommendations(
    page: number = 0,
    size: number = 10
): Promise<Page<RecommendationResponse>> {
    try {
        const response = await instance.get<Page<RecommendationResponse>>(
            `${api.admin.recommendations}`,
            {
                params: { page, size },
            }
        );
        return response.data;
    } catch (error) {
        console.error("추천 도서 목록 조회 실패:", error);
        throw error;
    }
};

export async function deleteRecommendation(recommendationId: number): Promise<void> {
    try {
        await instance.delete(`${api.admin.recommendations}/${recommendationId}`);
    } catch (error) {
        console.error("추천 도서 삭제 실패:", error);
        throw error;
    }
};

// 추천 도서 등록 (POST /api/v1/admin/books/{bookId}/recommend)
export async function createRecommendation(bookId: number): Promise<RecommendationResponse> {
    const response = await instance.post<RecommendationResponse>(
        `${api.admin.books}/${bookId}/recommend`
    );
    return response.data;
}
