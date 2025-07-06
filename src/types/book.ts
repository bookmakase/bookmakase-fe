export interface BookItem {
  bookId: number;
  title: string;
  authors: string[];
  isbn: string;
  createdAt: string;
  status: string;
  count: number;
  isRecommended: boolean; // ✅ 프론트 전용 필드
}

export interface BookCreateRequest {
  title: string;
  contents: string;
  isbn: string;
  publishedAt: string;
  authors: string[]; // comma-separated
  translators: string[]; // comma-separated
  publisher: string;
  price: number;
  salePrice: number;
  count: number;
  thumbnail: string;
  status: string;
}

export interface BookDetail {
  bookId: number;
  title: string;
  contents: string;
  authors: string[];
  publisher: string;
  price: number;
  salePrice: number;
  thumbnail: string;
  status: "정상판매" | "품절";
}
