"use client";

import React, { useState } from "react";
import MyPageNav from "../_components/MyPageNav";
import Button from "@/components/ui/Button";
import { useMyOrderList } from "@/hooks/query/useMyOrderList";
import { OrderItemResponse, OrderResponse } from "@/api/order";
import { useRouter } from "next/navigation";
import MyPageOrderItem from "./_components/MyPageOrderItem";

const isArrived = (dateStr?: string | null) => {
  if (!dateStr) return false;

  const target = new Date(dateStr);

  // 날짜만 비교하려면
  target.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return today >= target;
};

export default function OrderListPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 한 페이지당 보여질 아이템 개수
  // const [rating, setRating] = useState("0");
  // const [content, setContent] = useState("");

  const { data, isPending, isError } = useMyOrderList(
    currentPage,
    itemsPerPage
  );

  if (isPending) return <p className="flex-1 text-center">Loading…</p>;
  if (isError || !data)
    return <p className="flex-1 text-center">에러가 발생했어요.</p>;

  const { orders, totalPages } = data;

  const goPage = (p: number) => setCurrentPage(p);
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  const handleClickBookDetailMove = (bookId: number) => {
    router.push(`/books/${bookId}`);
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex  px-2 py-10">
      <MyPageNav />

      {/* 구매목록 콘텐츠 */}
      {orders.length === 0 ? (
        <div className="min-h-[calc(100vh-200px)] flex-1/3  flex flex-col px-12 py-3 gap-4 justify-center items-center">
          {/* 아이콘 (Heroicons 예시) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.5l1.129 6.772a.75.75 0 0 0 .743.628h12.756a.75.75 0 0 0 .743-.628L20.25 3h1.5M6 18.75a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm12 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
            />
          </svg>

          {/* 메시지 */}
          <p className="text-lg font-medium">구매한 상품이 없습니다.</p>

          {/* CTA(선택) ― 쇼핑 계속하기 버튼 등 */}
          <Button size="md" onClick={() => router.push("/")}>
            상품 보러가기 →
          </Button>
        </div>
      ) : (
        <div className="min-h-[calc(100vh-200px)] flex-1/3  flex flex-col px-12 py-3 gap-4">
          {/* 아이템 */}
          {orders.map((order: OrderResponse) => (
            <section
              key={order.orderId}
              className="flex flex-col gap-2 w-full px-4 py-5 border rounded-2xl shadow"
            >
              {/* 주문일 + 상세보기 버튼 */}
              <div className="w-full flex justify-between items-center">
                <p className="font-bold">
                  {order.orderDate?.slice(0, 10)} 주문
                </p>

                {/* 주문 상세보기, 취소 및 환불하기 버튼 */}
                <div className="flex gap-4">
                  <Button size="md" variant="outline">
                    주문 상세보기 →
                  </Button>
                  <Button color="cancel" variant="outline">
                    환불
                  </Button>
                </div>
              </div>

              {/* 주문 디테일 정보 콘텐츠 */}
              {order.orderItems.map((book: OrderItemResponse) => (
                <MyPageOrderItem
                  key={book.bookId}
                  book={book}
                  isArrived={isArrived}
                  order={order}
                  handleClickBookDetailMove={handleClickBookDetailMove}
                />
              ))}
            </section>
          ))}

          {/* 페이지 네이션 버튼 */}
          <nav className="w-full flex justify-center mt-6 gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={goPrev}
            >
              &lt;
            </Button>

            {new Array(totalPages).fill(null).map((_, i) => (
              <Button
                key={i + 1}
                size="sm"
                onClick={() => goPage(i + 1)}
                variant={i + 1 === currentPage ? "fill" : "outline"}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={goNext}
            >
              &gt;
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
