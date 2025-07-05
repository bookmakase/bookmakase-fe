import { api } from "@/constants/apiPath";
import type { BookDetail } from "@/types/book";

// 서버 컴포넌트에 사용
export const fetchBookDetail = async (
  bookId: number
): Promise<BookDetail | null> => {
  try {
    const response = await fetch(api.books.detail(bookId));

    if (!response.ok) {
      throw new Error("도서 상세 조회 실패");
    }

    const data = await response.json();
    console.log("도서 상세 데이터", data);

    return data;
  } catch (e) {
    console.error("도서 상세 조회 실패", e);
    return null;
  }
};
