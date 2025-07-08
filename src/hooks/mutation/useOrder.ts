import { useMutation } from "@tanstack/react-query";
import { postOrder } from "@/api/order";
import type { OrderRequestData } from "@/types/order";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/useOrderStore";

export const usePostOrder = () => {
  const router = useRouter();
  const { resetOrderStore } = useOrderStore();

  return useMutation({
    mutationFn: (reqDate: OrderRequestData) => postOrder(reqDate),
    onSuccess: () => {
      resetOrderStore();
      router.push("/mypage/order-list");
    },
    onError: (error) => {
      console.error("주문 요청 실패", error);
    },
  });
};
