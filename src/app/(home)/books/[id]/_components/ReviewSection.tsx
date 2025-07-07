"use client";

import { useState } from "react";
import { useGetReviews } from "@/hooks/query/useReview";
import ReviewItem from "./ReviewItem";
import { useAuthStore } from "@/store/auth";
import Pagination from "@/components/ui/Pagination";
// import { useMyIntro } from "@/hooks/query/useMyInfo";

export default function ReviewSection({ bookId }: { bookId: number }) {
  // 변수
  const [filter, setFilter] = useState("latest");
  const [page, setPage] = useState(0);

  // 데이터
  const {
    data: reviewPageResponse,
    isLoading,
    isError,
  } = useGetReviews(bookId, filter, page);
  // const { data: myInfo, isLoading: infoLoading } = useMyIntro();

  // 스토어
  const { isLogin } = useAuthStore();

  if (isLoading) {
    return <div className="text-center text-gray-400 py-8">로딩 중...</div>;
  }

  if (
    isError ||
    reviewPageResponse === null ||
    reviewPageResponse === undefined
  ) {
    return (
      <div className="text-center text-red-400 py-8">
        리뷰 목록 불러오기 실패
      </div>
    );
  }

  // 메서드
  const prevPage = () => {
    if (page <= 0) {
      alert("첫 번째 페이지입니다.");
      setPage(0);
    } else {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page >= reviewPageResponse.totalPages - 1) {
      alert("마지막 페이지입니다.");
      setPage(reviewPageResponse.totalPages - 1);
    } else {
      setPage(page + 1);
    }
  };

  const clickPage = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <section className="bg-white p-6 md:p-8 w-4xl mx-auto flex flex-col gap-6">
      {/* 상단: 제목 + 필터 */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-main">구매리뷰</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-main bg-white"
        >
          <option value="latest">최신순</option>
          {isLogin && <option value="myReview">내가 쓴 리뷰</option>}
        </select>
      </div>

      {/* 리뷰 목록 */}
      <div className="flex flex-col gap-4">
        {reviewPageResponse.totalElements === 0 ? (
          <p className="text-center text-gray-400 py-8">
            아직 작성된 리뷰가 없습니다.
          </p>
        ) : (
          reviewPageResponse.reviews.map((review, idx) => (
            <div
              key={review.reviewId}
              className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100"
            >
              <ReviewItem review={review} />
              {idx !== reviewPageResponse.reviews.length - 1 && (
                <hr className="my-4 border-gray-200" />
              )}
            </div>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      {reviewPageResponse.totalPages > 0 && (
        <Pagination
          currentPage={page}
          totalPages={reviewPageResponse.totalPages}
          clickPage={clickPage}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    </section>
  );
}
