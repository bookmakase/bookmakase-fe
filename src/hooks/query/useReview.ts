import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "@/api/review";

export const useGetReviews = (bookId: number, filter: string, page: number) => {
  return useQuery({
    queryKey: ["reviews", bookId, filter, page],
    queryFn: () => fetchReviews(bookId, filter, page),
    staleTime: 5 * 60 * 1000,
  });
};
