"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { fetchBookHome, searchBooks } from "@/api/home";
import type { BookHomeItem, BookHomeSectionResponse } from "@/types/book";

export default function Home() {
  const [books, setBooks] = useState<BookHomeSectionResponse[] | null>(null);
  const [searchResults, setSearchResults] = useState<BookHomeItem[]>([]);
  const [keyword, setKeyword] = useState("");
  const recommendedBooks: BookHomeItem[] =
    books?.find((section) => section.type === "recommended")?.books ?? [];

  const latestBooks: BookHomeItem[] =
    books?.find((section) => section.type === "latest")?.books ?? [];

  const [recommendedPage, setRecommendedPage] = useState(0);
  const [latestPage, setLatestPage] = useState(0);
  const ITEMS_PER_PAGE = 6;

  const paginatedRecommendedBooks = recommendedBooks.slice(
    recommendedPage * ITEMS_PER_PAGE,
    (recommendedPage + 1) * ITEMS_PER_PAGE
  );

  const paginatedLatestBooks = latestBooks.slice(
    latestPage * ITEMS_PER_PAGE,
    (latestPage + 1) * ITEMS_PER_PAGE
  );

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
    <main className="w-full min-h-[calc(100vh-120px)] flex flex-col gap-10 items-center py-10">
      {/* 🔍 검색 폼 */}
      <section className="w-full max-w-6xl px-4">
        <div className="flex justify-center items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="제목 또는 작가 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="border rounded px-2 py-1 w-[300px] md:w-[400px]"
          />

          <Button onClick={handleSearch}>검색</Button>
        </div>

        {searchResults.length > 0 && (
          <ul className="flex flex-wrap gap-4 justify-start">
            {searchResults.map((book, i) => (
              <Link
                key={i}
                href={`/books/${book.bookId}`}
                className="w-[160px] border p-2  shadow-sm bg-white hover:shadow-md transition"
              >
                <li>
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
                  <h3 className="font-semibold text-sm truncate">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {book.authors?.join(", ") ?? "저자 정보 없음"}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </section>

      {recommendedBooks.length > 0 && (
        <section className="w-full max-w-6xl px-4">
          {/* ✅ 제목: 왼쪽 정렬 + 카드 위에 위치 */}
          <div className="w-full mb-4">
            <h2 className="text-xl font-bold text-left ml-[60px]">
              에디터의 북마카세🍣
            </h2>
          </div>

          {/* ✅ 버튼 + 북카드 줄 */}
          <div className="flex items-center justify-center gap-4">
            {/* ◀ 이전 버튼 */}
            <button
              onClick={() =>
                setRecommendedPage((prev) => Math.max(prev - 1, 0))
              }
              disabled={recommendedPage === 0}
              className="bg-white border rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-50"
            >
              &lt;
            </button>

            {/* 🟦 북카드 6개 */}
            <ul className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {paginatedRecommendedBooks.map((book, i) => (
                <Link
                  key={i}
                  href={`/books/${book.bookId}`}
                  className="w-[160px] border p-2  shadow-sm bg-white hover:shadow-md transition"
                >
                  <li>
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
                    <h3 className="font-semibold text-sm truncate">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {book.authors?.join(", ") ?? "저자 정보 없음"}
                    </p>
                  </li>
                </Link>
              ))}
            </ul>

            {/* ▶ 다음 버튼 */}
            <button
              onClick={() =>
                setRecommendedPage((prev) =>
                  (prev + 1) * ITEMS_PER_PAGE < recommendedBooks.length
                    ? prev + 1
                    : prev
                )
              }
              disabled={
                (recommendedPage + 1) * ITEMS_PER_PAGE >=
                recommendedBooks.length
              }
              className="bg-white border rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </section>
      )}

      <section className="w-full max-w-6xl px-4">
        {/* ✅ 제목: 왼쪽 정렬 + 북카드 위에 */}
        <div className="w-full mb-4">
          <h2 className="text-xl font-bold text-left ml-[60px]">
            새로 등록된 책📚
          </h2>
        </div>

        {/* ✅ 버튼 + 북카드 줄 */}
        <div className="flex items-center justify-center gap-4">
          {/* ◀ 이전 버튼 */}
          <button
            onClick={() => setLatestPage((prev) => Math.max(prev - 1, 0))}
            disabled={latestPage === 0}
            className="bg-white border rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-50"
          >
            &lt;
          </button>

          {/* 🟦 북카드 6개 */}
          <ul className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {paginatedLatestBooks.map((book, i) => (
              <Link
                key={i}
                href={`/books/${book.bookId}`}
                className="w-[160px] border p-2  shadow-sm bg-white hover:shadow-md transition"
              >
                <li>
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
                  <h3 className="font-semibold text-sm truncate">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {book.authors?.join(", ") ?? "저자 정보 없음"}
                  </p>
                </li>
              </Link>
            ))}
          </ul>

          {/* ▶ 다음 버튼 */}
          <button
            onClick={() =>
              setLatestPage((prev) =>
                (prev + 1) * ITEMS_PER_PAGE < latestBooks.length
                  ? prev + 1
                  : prev
              )
            }
            disabled={(latestPage + 1) * ITEMS_PER_PAGE >= latestBooks.length}
            className="bg-white border rounded-full w-10 h-10 flex items-center justify-center shadow-md disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </section>
    </main>
  );
}
