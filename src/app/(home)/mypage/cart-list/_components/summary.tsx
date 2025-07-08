"use client";

import React, { useState } from "react";

interface CartBook {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface SummaryProps {
  cartBooks: CartBook[];
}

export default function Summary({ cartBooks }: SummaryProps) {
  const [isActive, setIsActive] = useState(false);

  const totalPrice = cartBooks.reduce(
    (sum, book) => sum + book.price * book.quantity,
    0
  );

  // 클릭 시 반전 -> 잠시 후 다시 복귀
  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 200); // 200ms 후 복귀
    // 여기에 주문 처리 로직 추가 가능
  };

  return (
    <div className="p-4 border rounded bg-gray-50">
      <div className="flex justify-between mb-4">
        <span className="font-semibold">총합계</span>
        <span className="font-bold text-lg">
          ₩{totalPrice.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleClick}
          className={`px-4 py-2 rounded border transition-colors duration-200 ${
            isActive
              ? "bg-white text-green-500 border-green-500"
              : "bg-green-500 text-white border-green-500"
          }`}
        >
          주문하기
        </button>
        <button className="px-4 py-2 border rounded">엑셀 다운로드</button>
      </div>
    </div>
  );
}
