export const api = {
  auth: {},
  users: {},
  books: {},
  orders: {},
  cart: {},
  admin: {
    books: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/books`},
  reviews: {
    list: (bookId: string | number) =>
      `${process.env.NEXT_PUBLIC_API_URL}/v1/books/${bookId}/reviews`,
  },
  comments: {},
};
