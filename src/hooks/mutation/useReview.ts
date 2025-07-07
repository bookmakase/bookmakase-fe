import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAndRestoration } from "@/api/review";

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
