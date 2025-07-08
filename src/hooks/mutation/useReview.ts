import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAndRestoration, postReview } from "@/api/review";
import type { ReviewCreateReqProps } from "@/types/review";

export const usePostReview = () => {
  return useMutation({
    mutationFn: (reviewData: ReviewCreateReqProps) => postReview(reviewData),
    onSuccess: () => {
      alert("리뷰가 작성됐습니다.");
    },
    onError: (error) => {
      console.error("리뷰 작성 실패", error);
    },
  });
};

export const usePatchReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => deleteAndRestoration(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      console.error("리뷰 삭제, 복구 실패", error);
    },
  });
};
