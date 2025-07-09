"use client";

import React from "react";
import CartItem from "./_components/cart-item";
import Summary from "./_components/summary";
import RecommendationBook from "./_components/recommendation-book";
import MyPageNav from "../_components/MyPageNav";

// 샘플 데이터 (이미지 제거 버전)
const sampleCartBooks = [
  { id: 1, title: "첫 번째 책", price: 15000, quantity: 1 },
  { id: 2, title: "두 번째 책", price: 18000, quantity: 2 },
  { id: 3, title: "세 번째 책", price: 22000, quantity: 3 },
];

export default function CartListPage() {
  const [cartBooks, setCartBooks] = React.useState(sampleCartBooks);

  React.useEffect(() => {
    fetch("/api/cart")
      .then((res) => (res.ok ? res.json() : Promise.reject("404")))
      .then((data) => setCartBooks(data))
      .catch((err) => {
        console.error("API 실패 fallback:", err);
        setCartBooks(sampleCartBooks);
      });
  }, []);

  function handleQuantityChange(id: number, delta: number) {
    setCartBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? { ...book, quantity: Math.max(1, book.quantity + delta) }
          : book
      )
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex justify-center items-center px-2 py-10">
      <MyPageNav />
      <div className="min-h-[calc(100vh-200px)] flex-1/3  flex flex-col px-12 py-10 gap-4">
        <h1 className="text-3xl font-bold mb-6">🛒 장바구니</h1>

        {/* 🛒 장바구니 상품 리스트 */}
        <div className="space-y-4 mb-6">
          {cartBooks.map((book) => (
            <CartItem
              key={book.id}
              book={book}
              onQuantityChange={handleQuantityChange}
            />
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
