import { api } from "@/constants/apiPath";
import { Review, ReviewFilter } from "@/types/review";
import { instance } from "@/lib/axios";

interface ReviewPageResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  reviews: Review[];
}

// 클라이언트 컴포넌트에 사용
export const fetchReviews = async (
  bookId: number,
  filter: string,
  page: number
): Promise<ReviewPageResponse | null> => {
  const params = new URLSearchParams();
  let apiUrl = `${api.reviews.list(bookId)}?page=${page}`;

  if (filter === ReviewFilter.MyReview) {
    params.append("myReviewOnly", "true");
  } else if (filter === ReviewFilter.Latest) {
    params.append("sortBy", ReviewFilter.Latest.toUpperCase());
  }

  if (params.toString()) {
    apiUrl += `&${params.toString()}`;
  }

  try {
    const response = await instance.get(apiUrl);

    if (response.status !== 200) {
      throw new Error("리뷰 목록 조회 실패");
    }

    console.log("리뷰 목록 데이터", response.data);
    return response.data;
  } catch (e) {
    console.error("리뷰 목록 조회 실패", e);
    return null;
  }
};
