'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { fetchRecommendations, deleteRecommendation } from '@/api/admin';
import type { RecommendationResponse } from '@/types/recommendation';
import type { PageInfo } from '@/types/pagination';
import Button from '@/components/ui/Button';

export default function RecommendationBookPage() {
    const [recommendations, setRecommendations] = useState<RecommendationResponse[]>([]);
    const [pageInfo, setPageInfo] = useState<PageInfo | null>(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const page = Number(searchParams.get("page")) || 1;

    const fetchData = useCallback(async () => {
        try {
            const res = await fetchRecommendations(page);
            setRecommendations(res.content);
            setPageInfo(res);
        } catch (err) {
            const message = err instanceof Error ? err.message : '오류가 발생했습니다';
            setError(message);
        }
    }, [page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (id: number) => {
        try {
            await deleteRecommendation(id);
            fetchData();
        } catch {
            setError('삭제 실패');
        }
    };

    const handleMoveToPage = (p: number) => router.push(`/admin/recommendations?page=${p}`);
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
                <h1 className="text-2xl font-bold mb-4">🌟 추천 도서 관리</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <table className="w-full table-auto border">
                    <thead>
                    <tr className="bg-[var(--color-light-gray)]">
                        {['ID', '제목', '추천자', '추천일', '관리'].map((h) => (
                            <th key={h} className="border px-3 py-2 whitespace-nowrap">{h}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {recommendations.map((rec) => (
                        <tr key={rec.recommendedBookId}>
                            <td className="border px-3 py-2 text-center">{rec.recommendedBookId}</td>
                            <td className="border px-3 py-2 whitespace-nowrap">{rec.title}</td>
                            <td className="border px-3 py-2">{rec.username}</td>
                            <td className="border px-3 py-2 whitespace-nowrap">{rec.recommendedAt.split("T")[0]}</td>
                            <td className="border px-3 py-2 text-center">
                                <Button onClick={() => handleDelete(rec.recommendedBookId)} size="md-70" color="cancel">
                                    삭제
                                </Button>
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
