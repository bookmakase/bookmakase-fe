import { instance } from "@/lib/axios";
import { api } from "@/constants/apiPath";
import type { BookItem, BookDetail, BookCreateRequest, BookUpdateRequest } from '@/types/book';
import type { Page } from '@/types/pagination';


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

export async function updateBook(bookId: number, payload: BookUpdateRequest): Promise<void> {
    await instance.put(`${api.admin.books}/${bookId}`, payload);
}

export async function fetchBook(bookId: number): Promise<BookDetail> {
    const res = await instance.get(`${api.admin.books}/${bookId}`);
    return res.data;
}