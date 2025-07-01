export const api = {
  auth: {},
  users: {},
  books: {},
  orders: {},
  cart: {},
  admin: {},
  reviews: {
    list: (bookId: string | number) =>
      `${process.env.NEXT_PUBLIC_API_URL}/v1/books/${bookId}/reviews`,
  },
  comments: {},
};
