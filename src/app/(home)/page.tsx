"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { fetchBookHome, searchBooks  } from "@/api/home"; // ✅ 이 부분
import type {BookHomeResponse } from "@/types/book";

export default function Home() {
    const [books, setBooks] = useState<BookHomeResponse | null>(null);
    const [searchResults, setSearchResults] = useState<BookHomeResponse[]>([]);
    const [keyword, setKeyword] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchBookHome();
                setBooks(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleSearch = async () => {
        try {
            const results = await searchBooks(keyword);
            setSearchResults(results);
        } catch (err) {
            console.error("검색 실패:", err);
        }
    };

    return (
        <main className="w-full min-h-[calc(100vh-120px)] flex flex-col gap-10 items-center">

            <Link href={"/admin/books"} className="font-bookk-bold mt-4">
                관리자 페이지 이동
            </Link>

            {/* 🔍 검색 폼 */}
            <section className="w-full max-w-6xl px-4">
                <h2 className="text-xl font-bold mb-4">도서 검색</h2>
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="제목 또는 작가 검색"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="border rounded px-2 py-1 w-2/3"
                    />
                    <Button onClick={handleSearch}>검색</Button>
                </div>

                {searchResults.length > 0 && (
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {searchResults.map((book, i) => (
                            <li
                                key={i}
                                className="w-full border p-2 rounded-xl shadow-sm bg-white"
                            >
                                {book.thumbnail ? (
                                    <img
                                        src={book.thumbnail}
                                        alt={book.title}
                                        className="w-full h-48 object-cover rounded-md mb-2"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 rounded-md mb-2 flex items-center justify-center text-sm text-gray-500">
                                        이미지 없음
                                    </div>
                                )}
                                <h3 className="font-semibold text-sm truncate">{book.title}</h3>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                    {book.authors?.join(", ") ?? "저자 정보 없음"}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/*  최신 도서 */}
            <section className="w-full max-w-6xl px-4">
                <h2 className="text-xl font-bold mb-4">새로 등록된 책</h2>
                <div className="overflow-x-auto">
                    <ul className="flex gap-4 min-w-max">
                        {books?.latestBooks.map((book, i) => (
                            <li
                                key={i}
                                className="flex-shrink-0 w-[160px] border p-2 rounded-xl shadow-sm bg-white"
                            >
                                {book.thumbnail ? (
                                    <img
                                        src={book.thumbnail}
                                        alt={book.title}
                                        className="w-full h-48 object-cover rounded-md mb-2"
                                    />
                                ) : (
                                    <div className="w-full h-48 bg-gray-200 rounded-md mb-2 flex items-center justify-center text-sm text-gray-500">
                                        이미지 없음
                                    </div>
                                )}
                                <h3 className="font-semibold text-sm truncate">{book.title}</h3>
                                <p className="text-xs text-gray-500 line-clamp-1">
                                    {book.authors?.join(", ") ?? "저자 정보 없음"}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}