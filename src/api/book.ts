import { api } from "@/constants/apiPath";
import type { BookDetail } from "@/types/book";
import { instance } from "@/lib/axios";

// 서버 컴포넌트에 사용
export const fetchBookDetail = async (
  bookId: number
): Promise<BookDetail | null> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${api.books.detail(
    bookId
  )}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("도서 상세 조회 실패");
    }

    const data = await response.json();
    // console.log("도서 상세 데이터", data);

    return data;
  } catch (e) {
    console.error("도서 상세 조회 실패", e);
    return null;
  }
};

// 클라이언트 컴포넌트에 사용
export const getBookDetail = async (
  bookId: number
): Promise<BookDetail | null> => {
  try {
    const response = await instance.get(`${api.books.detail(bookId)}`);

    if (response.status !== 200) {
      throw new Error("도서 상세 조회 실패");
    }

    const data = await response.data;
    // console.log("도서 상세 데이터", data);

    return data;
  } catch (e) {
    console.error("도서 상세 조회 실패", e);
    return null;
  }
};
