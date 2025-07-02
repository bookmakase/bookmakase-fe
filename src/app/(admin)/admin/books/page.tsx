'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

import Button from '@/components/ui/Button';
import { api } from '@/constants/apiPath';
import type { PageInfo } from '@/types/pagination';
import type { BookItem } from '@/types/book';
import { useCallback } from 'react'; // 추가



export default function BookListPage() {
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

    const handleMoveToPage = (p: number) => {
        router.push(`/admin/books?page=${p}`);
    };

    const handleEdit = (bookId: number) => {
        router.push(`/admin/edit-book/${bookId}`);
    };

    const handleToggleRecommend = (bookId: number, current: boolean) => {
        setBooks((prev) =>
            prev.map((book) =>
                book.bookId === bookId
                    ? { ...book, isRecommended: !current }
                    : book
            )
        );
    };


    const handleAddBook = () => {
        router.push("/admin/add-book");
    };

    const handleMoveToTab = (path: string) => {
        router.push(path);
    };

    return (
        <div className="flex min-h-screen">
            {/* 왼쪽 사이드바 */}
            <aside className="w-60 p-6 border-r flex flex-col gap-4 bg-gray-50">
                <button
                    onClick={() => handleMoveToTab('/admin/books')}
                    className={`text-left text-lg font-semibold ${pathname === '/admin/books' ? 'text-main' : 'text-gray-700'} hover:text-main`}
                >
                    📚 도서 관리
                </button>
                <button
                    onClick={() => handleMoveToTab('/admin/recommendations')}
                    className={`text-left text-lg font-semibold ${pathname === '/admin/recommendation' ? 'text-main' : 'text-gray-700'} hover:text-main`}
                >
                    🌟 추천 도서 관리
                </button>
            </aside>

            {/* 우측 메인 콘텐츠 */}
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">📚 도서 관리</h1>
                    <Button
                        onClick={handleAddBook}
                        size="md"
                        color="main"
                        className="text-sm"
                    >
                        도서 등록
                    </Button>
                </div>

                {error && <p style={{ color: 'var(--color-cancel)' }}>{error}</p>}

                <table className="w-full table-auto border">
                    <thead>
                    <tr className="bg-[var(--color-light-gray)]">
                        <th className="border px-3 py-2">ID</th>
                        <th className="border px-3 py-2">제목</th>
                        <th className="border px-3 py-2">저자</th>
                        <th className="border px-3 py-2">ISBN</th>
                        <th className="border px-3 py-2">등록일</th>
                        <th className="border px-3 py-2">상태</th>
                        <th className="border px-3 py-2 whitespace-nowrap">재고</th>
                        <th className="border px-3 py-2">관리</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map((book) => (
                        <tr key={book.bookId}>
                            <td className="border px-3 py-2 text-center">{book.bookId}</td>
                            <td className="border px-3 py-2 whitespace-nowrap">{book.title}</td>
                            <td className="border px-3 py-2">{book.authors.join(', ')}</td>
                            <td className="border px-3 py-2">{book.isbn}</td>
                            <td className="border px-3 py-2 whitespace-nowrap">{book.createdAt.split("T")[0]}</td>
                            <td className="border px-3 py-2 whitespace-nowrap">{book.status}</td>
                            <td className="border px-3 py-2 text-center">{book.count}</td>
                            <td className="border px-3 py-2 whitespace-nowrap">
                                <div className="flex gap-2 justify-center">
                                    <Button
                                        onClick={() => handleEdit(book.bookId)}
                                        size="md-70"
                                        color="main"
                                    >
                                        편집
                                    </Button>
                                    <Button
                                        onClick={() => handleToggleRecommend(book.bookId, book.isRecommended)}
                                        size="md-70"
                                        color={book.isRecommended ? "cancel" : "main"}
                                    >
                                        {book.isRecommended ? "추천 해제" : "추천"}
                                    </Button>

                                </div>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>

                {pageInfo && (
                    <div className="flex gap-2 justify-center mt-6">
                        {Array.from({ length: pageInfo.totalPages }, (_, i) => (
                            <Button
                                key={i}
                                onClick={() => handleMoveToPage(i + 1)}
                                size="sm"
                                variant={pageInfo.page === i + 1 ? "fill" : "outline"}
                                color="main"
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                )}

            </main>
        </div>
    );
}