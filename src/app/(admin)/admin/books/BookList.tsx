'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@/components/ui/Button';
import { api } from '@/constants/apiPath';
import type { PageInfo } from '@/types/pagination';
import type { BookItem } from '@/types/book';

export default function BookList() {
    const [books, setBooks] = useState<BookItem[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const page = Number(searchParams.get("page")) || 1;

    const fetchBooks = useCallback(async () => {
        try {
            const res = await axios.get(`${api.admin.books}?page=${page}`);
            const booksWithRecommendation = res.data.content.map((book: BookItem) => ({
                ...book,
                isRecommended: false,
            }));
            setBooks(booksWithRecommendation);
            setPageInfo(res.data);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || '도서 목록 불러오기에 실패했습니다.');
            } else {
                setError('알 수 없는 오류가 발생했습니다.');
            }
        }
    }, [page]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const handleMoveToPage = (p: number) => router.push(`/admin/books?page=${p}`);
    const handleEdit = (bookId: number) => router.push(`/admin/edit-book/${bookId}`);
    const handleToggleRecommend = (bookId: number, current: boolean) => {
        setBooks((prev) =>
            prev.map((book) =>
                book.bookId === bookId ? { ...book, isRecommended: !current } : book
            )
        );
    };
    const handleAddBook = () => router.push("/admin/add-book");
    const handleMoveToTab = (path: string) => router.push(path);

    return (
        <div className="flex min-h-screen">
            {/* ... 이전 코드 동일 ... */}
        </div>
    );
}
