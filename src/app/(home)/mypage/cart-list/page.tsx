"use client";

import * as React from "react";
import MyPageNav from "../_components/MyPageNav";
import CartItem from "./_components/cart-item";
import Summary from "./_components/summary";
import RecommendationBook from "./_components/recommendation-book";

// 샘플 데이터 (나중에 API 연결 시 교체 예정)
const sampleCartBooks = [
  {
    id: 1,
    title: "첫 번째 책",
    price: 15000,
    imageUrl: "/images/book1.jpg",
    quantity: 1,
  },
  {
    id: 2,
    title: "두 번째 책",
    price: 18000,
    imageUrl: "/images/book2.jpg",
    quantity: 2,
  },
  {
    id: 3,
    title: "세 번째 책",
    price: 22000,
    imageUrl: "/images/book3.jpg",
    quantity: 3,
  },
];

export default function CartListPage() {
  const [cartBooks, setCartBooks] = React.useState(sampleCartBooks);

  React.useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCartBooks(data))
      .catch((err) => {
        console.error("장바구니 데이터 불러오기 실패:", err);
        // API 실패 시 fallback 샘플 데이터 사용
        setCartBooks(sampleCartBooks);
      });
  }, []);

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex justify-center items-start px-2 py-10 gap-6">
      <MyPageNav />
      {/* 🟦 장바구니 메인 영역 */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">🛒 장바구니</h1>

        {/* 🛒 장바구니 상품 리스트 */}
        <div className="space-y-4 mb-6">
          {cartBooks.map((book) => (
            <CartItem key={book.id} book={book} />
          ))}
        </div>

        {/* 💵 총합계 및 결제 버튼 */}
        <Summary cartBooks={cartBooks} />

        {/* 📚 추천 도서 영역 */}
        <RecommendationBook />
      </div>
    </div>
  );
}
