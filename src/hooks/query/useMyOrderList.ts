import { getOrderItemList } from "@/api/order";
import { useQuery } from "@tanstack/react-query";

export function useMyOrderList(page: number, size = 4) {
  return useQuery({
    queryKey: ["myOrderList", page, size], // 페이지 별 캐시
    queryFn: async () => await getOrderItemList(page, size),
    staleTime: 5,
  });
}
