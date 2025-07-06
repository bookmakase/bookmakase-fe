import type { Review } from "@/types/review";
import { useAuthStore } from "@/store/auth";
import { formatDate } from "@/utils/formatDate";

type ReviewProp = {
  review: Review;
};

export default function ReviewItem({ review }: ReviewProp) {
  const { user, content, rating, updatedAt } = review;
  const { isLogin } = useAuthStore();

  return (
    <div className="flex flex-col gap-2">
      {/* 상단: 유저명, 날짜, 평점, 수정/삭제 */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-main">{user.username}</span>
          <span className="text-xs text-gray-400">{formatDate(updatedAt)}</span>
          <span className="flex items-center gap-1 text-yellow-400 text-base font-bold">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < rating ? "★" : "☆"}</span>
            ))}
            <span className="ml-1 text-gray-500 text-xs">({rating})</span>
          </span>
        </div>
        {isLogin && (
          <div className="flex items-center gap-1">
            <button className="text-xs text-gray-400 hover:text-main px-2 py-1 rounded transition cursor-pointer">
              수정
            </button>
            <button className="text-xs text-gray-400 hover:text-red-500 px-2 py-1 rounded transition cursor-pointer">
              삭제
            </button>
          </div>
        )}
      </div>
      {/* 본문 */}
      <div className="text-gray-800 text-sm leading-relaxed px-1 py-2 whitespace-pre-line">
        {content}
      </div>
      {/* 답글 토글 */}
      <div className="flex justify-end">
        <button className="text-xs text-main border border-main rounded-full px-3 py-1 hover:bg-main hover:text-white transition cursor-pointer">
          답글 보기
        </button>
      </div>
    </div>
  );
}
