import { instance } from "@/lib/axios";
import { api } from "@/constants/apiPath";
import type { BookHomeItem } from '@/types/book';

export async function fetchBookHome(): Promise<BookHomeItem> {
    try {
        const res = await instance.get(`${api.books.home}`);
        return res.data;
    } catch (error) {
        console.error("홈 도서 조회 실패:", error);
        throw error;
    }
}

export async function searchBooks(title?: string, author?: string): Promise<BookHomeItem[]> {
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (author) params.append("author", author);

    const res = await instance.get(`${api.books.search}?${params.toString()}`);
    return res.data;
}
