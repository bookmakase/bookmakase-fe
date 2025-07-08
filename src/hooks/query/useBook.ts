import { useQuery } from "@tanstack/react-query";
import { getBookDetail } from "@/api/book";

export const useGetBookDetail = (bookId: number) => {
  return useQuery({
    queryKey: ["book-detail", bookId],
    queryFn: () => getBookDetail(bookId),
    staleTime: 5 * 60 * 1000,
  });
};
