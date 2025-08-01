import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAndRestoration, postReview, putReview } from "@/api/review";
import type {
  ReviewCreateReqProps,
  ReviewUpdateReqProps,
} from "@/types/review";
import { useRouter } from "next/navigation";

export const usePostReview = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewData: ReviewCreateReqProps) => postReview(reviewData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      alert("리뷰가 작성됐습니다.");
      router.push(`/books/${data.bookId}`);
    },
    onError: (error) => {
      console.error("리뷰 작성 실패", error);
    },
  });
};

export const usePutReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewData: ReviewUpdateReqProps) => putReview(reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      alert("리뷰가 수정됐습니다.");
    },
    onError: (error) => {
      console.error("리뷰 수정 실패", error);
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
