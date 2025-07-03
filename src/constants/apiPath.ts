export const api = {
  auth: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth`,
  users: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
  books: {},
  orders: {},
  cart: {},
  admin: {
    books: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/books`,
  },
  reviews: {
    list: (bookId: string | number) =>
      `${process.env.NEXT_PUBLIC_API_URL}/v1/books/${bookId}/reviews`,
  },
  comments: {},
};
