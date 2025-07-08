import { useMutation } from "@tanstack/react-query";
import { postOrder } from "@/api/order";

export const usePostOrder = () => {
  return useMutation({
    mutationFn: () => postOrder(),
    onError: (error) => {
      console.error("주문 요청 실패", error);
    },
  });
};
