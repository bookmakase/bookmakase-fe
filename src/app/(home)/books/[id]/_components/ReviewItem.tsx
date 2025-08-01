import type { Review } from "@/types/review";
import type { MyInfo } from "@/types/user";
import { useState, useEffect } from "react";
import { formatDate } from "@/utils/formatDate";
import { useMyIntro } from "@/hooks/query/useMyInfo";
import { usePatchReview, usePutReview } from "@/hooks/mutation/useReview";
import Button from "@/components/ui/Button";
import StarRating from "@/components/ui/StarRating";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ReviewProp = {
  review: Review;
  // myInfo: MyInfo | null;
};

export default function ReviewItem({ review }: ReviewProp) {
  const { reviewId, user, content, rating, updatedAt, deleted } = review;

  // 변수
  const [myInfo, setMyInfo] = useState<MyInfo | null>(null);
  const [newRating, setNewRating] = useState(rating);
  const [newContent, setNewContent] = useState(content);

  // api 훅
  const { data, isLoading, isError } = useMyIntro();
  const { mutate: patchReviewMutate } = usePatchReview();
  const { mutate: putReviewMutate } = usePutReview();

  useEffect(() => {
    if (isError || data === null || data === undefined) {
      setMyInfo(null);
    } else {
      setMyInfo(data);
    }
  }, [data, isError]);

  if (isLoading) {
    return <div className="text-center text-gray-400 py-8">로딩 중...</div>;
  }

  return (
    <div>
      {deleted ? (
        <div className="flex justify-center gap-2">
          <div className="flex items-center gap-2 text-gray-500 font-semibold">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-1.414 1.414M6.343 17.657l-1.414 1.414M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>삭제된 리뷰입니다.</span>
          </div>
          {myInfo !== null && myInfo.userId === user.userId && (
            <Button
              color="main"
              variant="outline"
              size="sm"
              onClick={() => patchReviewMutate(reviewId)}
            >
              복구하기
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {/* 상단: 유저명, 날짜, 평점, 수정/삭제 */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-main">{user.username}</span>
              <span className="text-xs text-gray-400">
                {formatDate(updatedAt)}
              </span>
              <span className="flex items-center gap-1 text-yellow-400 text-base font-bold">
                <StarRating
                  initialRating={rating}
                  className="scale-75"
                  isReadOnly={true}
                />
                <span className="ml-1 text-gray-500 text-xs">({rating})</span>
              </span>
            </div>
            {myInfo !== null && myInfo.userId === user.userId && (
              <div className="flex items-center gap-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-xs text-gray-400 hover:text-main px-2 py-1 rounded transition cursor-pointer">
                      수정
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>리뷰 수정</DialogTitle>
                      {/* 평점 입력 영역 */}
                      <label
                        htmlFor="star-rating"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-4"
                      >
                        평점을 입력해주세요.
                      </label>
                      <div id="star-rating" className="flex items-center gap-2">
                        <StarRating
                          initialRating={newRating}
                          onChange={setNewRating}
                        />
                        <span className="text-lg font-semibold">
                          {newRating} / 10
                        </span>
                      </div>
                      <label
                        htmlFor="review"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-4"
                      >
                        리뷰를 작성해주세요.
                      </label>
                      <div className="flex items-center gap-2">
                        <div className="grid flex-1 gap-2">
                          <textarea
                            id="review"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                            rows={5}
                            className="
                              border
                              border-gray-300
                              focus:border-blue-500
                              focus:ring-blue-500
                              rounded-md
                              p-2
                            "
                          />
                        </div>
                      </div>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="outline"
                          color="main"
                          onClick={() =>
                            putReviewMutate({
                              reviewId,
                              reviewReq: {
                                rating: parseInt(newRating.toString()),
                                content: newContent,
                              },
                            })
                          }
                        >
                          수정하기
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <button
                  className="text-xs text-gray-400 hover:text-red-500 px-2 py-1 rounded transition cursor-pointer"
                  onClick={() => patchReviewMutate(reviewId)}
                >
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
            <button className="text-xs text-main border border-main rounded-full px-3 py-1 hover:bg-main hover:text-white transition cursor-pointer shadow-sm">
              답글 보기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
