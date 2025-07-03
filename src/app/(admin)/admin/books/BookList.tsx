'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { fetchBooks } from '@/api/admin';
import Button from '@/components/ui/Button';
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

    const fetchBooksData = useCallback(async () => {
        try {
            const res = await fetchBooks(page);
            setBooks(
                res.content.map((book) => ({ ...book, isRecommended: false }))
            );
            setPageInfo(res);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
            setError(message);
        }
    }, [page]);

    useEffect(() => {
        fetchBooksData();
    }, [fetchBooksData]);

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

    const SideMenu = () => (
        <aside className="w-60 p-6 border-r flex flex-col gap-4 bg-gray-50">
            {[
                { label: '📚 도서 관리', path: '/admin/books' },
                { label: '🌟 추천 도서 관리', path: '/admin/recommendations' },
            ].map(({ label, path }) => (
                <button
                    key={path}
                    onClick={() => handleMoveToTab(path)}
                    className={`text-left text-lg font-semibold ${pathname === path ? 'text-main' : 'text-gray-700'} hover:text-main`}
                >
                    {label}
                </button>
            ))}
        </aside>
    );

    return (
        <div className="flex min-h-screen">
            <SideMenu />
            <main className="flex-1 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">📚 도서 관리</h1>
                    <Button onClick={handleAddBook} size="md" color="main" className="text-sm">
                        도서 등록
                    </Button>
                </div>

                {error && <p style={{ color: 'var(--color-cancel)' }}>{error}</p>}

                <table className="w-full table-auto border">
                    <thead>
                    <tr className="bg-[var(--color-light-gray)]">
                        {['ID', '제목', '저자', 'ISBN', '등록일', '상태', '재고', '관리'].map((h) => (
                            <th key={h} className="border px-3 py-2 whitespace-nowrap">{h}</th>
                        ))}
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
                                    <Button onClick={() => handleEdit(book.bookId)} size="md-70" color="main">
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
