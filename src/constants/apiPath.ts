export const api = {
  auth: {
    register: `/api/v1/auth/register`,
    login: `/api/v1/auth/login`,
    logout: `/api/v1/auth/logout`,
    refreshtoken: `/api/v1/auth/refreshtoken`,
  },
  users: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
  books: {
    home: `api/v1/books/home`,
    search: `api/v1/books/search`,
    detail: (bookId: string | number) => `/api/v1/books/${bookId}`,
  },
  orders: {
    orderList: `/api/v1`,
  },
  cart: {},
  admin: {
    books: `api/v1/admin/books`,
    recommendations: `/api/v1/admin/books/recommendations`
  },
  reviews: {
    list: (bookId: string | number) => `/api/v1/books/${bookId}/reviews`,
    deleteAndRestoration: (reviewId: string | number) =>
      `/api/v1/reviews/${reviewId}`,
  },
  comments: {},
};