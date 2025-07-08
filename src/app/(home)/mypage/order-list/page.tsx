"use client";

import React, { useState } from "react";
import MyPageNav from "../_components/MyPageNav";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useMyOrderList } from "@/hooks/query/useMyOrderList";
import { OrderItemResponse, OrderResponse } from "@/api/order";
import { useRouter } from "next/navigation";

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
              {order.orderItems.map((book: OrderItemResponse) => {
                const arrived = isArrived(order.expectedArrivalDate);
                const statusLabel = arrived ? "배송완료" : book.orderStatus;
                const dateLabel = arrived ? "도착 완료" : "도착 예정일";

                return (
                  <div
                    key={book.bookId}
                    className="flex justify-between items-center w-full px-10 py-5 border rounded-md"
                  >
                    <div className="flex flex-col gap-2 cursor-pointer">
                      <div className="flex gap-1 items-end">
                        <p className="font-bold">{statusLabel}</p>
                        <small className="text-main">
                          {order.expectedArrivalDate?.slice(0, 10)} {dateLabel}
                        </small>
                      </div>

                      <div
                        className="flex justify-center items-center gap-4"
                        onClick={() => handleClickBookDetailMove(book.bookId)}
                      >
                        <div className="w-[160px] h-[160px] overflow-hidden border shadow relative">
                          <Image
                            alt={`${book.thumbnail}`}
                            src={book.thumbnail ?? ""}
                            fill
                            priority
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p>{book.title}</p>
                          <p className="truncate text-sm max-w-[200px]">
                            {book.contents}
                          </p>
                          <div className="flex gap-2 text-gray-400">
                            <small>{book.salePrice}원</small>
                            <small>{book.orderQuantity}개</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button size="md">리뷰 작성하기</Button>
                  </div>
                );
              })}
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
