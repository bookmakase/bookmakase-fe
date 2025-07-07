export interface BookItem {
  bookId: number;
  title: string;
  authors: string[] | null;
  isbn: string | null;
  createdAt: string;
  status: string | null;
  count: number;
  recommended: boolean;
}

export interface BookDetail extends BookItem {
  contents: string | null;
  translators: string[] | null;
  publishedAt: string | null;
  publisher: string | null;
  price: number | null;
  salePrice: number | null;
  thumbnail: string | null;
}

export interface BookCreateRequest {
  title: string;
  contents: string | null;
  isbn: string | null;
  publishedAt: string | null;
  authors: string[] | null; // comma-separated
  translators: string[] | null; // comma-separated
  publisher: string | null;
  price: number | null;
  salePrice: number | null;
  count: number;
  thumbnail: string | null;
  status: string | null;
}

export interface BookUpdateRequest {
  title: string;
  contents: string | null;
  isbn: string | null;
  publishedAt: string | null;
  authors: string[] | null; // comma-separated
  translators: string[] | null; // comma-separated
  publisher: string | null;
  price: number | null;
  salePrice: number | null;
  count: number;
  thumbnail: string | null;
  status: string | null;
}
export interface BookHomeResponse {
  title: string;
  authors: string[] | null; // comma-separated
  thumbnail: string | null;
}
export interface BookHomeResponse {
  latestBooks: BookHomeResponse[];
}
