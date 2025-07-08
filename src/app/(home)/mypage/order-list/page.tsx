"use client";

import React, { useState } from "react";
import MyPageNav from "../_components/MyPageNav";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useMyOrderList } from "@/hooks/query/useMyOrderList";
import { OrderItemResponse, OrderResponse } from "@/api/order";

export default function OrderListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // 한 페이지당 보여질 아이템 개수

  const { data, isPending, isError } = useMyOrderList(
    currentPage,
    itemsPerPage
  );

  console.log("data : ", data);

  if (isPending) return <p className="flex-1 text-center">Loading…</p>;
  if (isError || !data)
    return <p className="flex-1 text-center">에러가 발생했어요.</p>;

  const { orders, totalPages } = data;

  const goPage = (p: number) => setCurrentPage(p);
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex  px-2 py-10">
      <MyPageNav />

      {/* 구매목록 콘텐츠 */}
      <div className="min-h-[calc(100vh-200px)] flex-1/3  flex flex-col px-12 py-3 gap-4">
        {/* 아이템 */}
        {orders.map((order: OrderResponse) => (
          <section
            key={order.orderId}
            className="flex flex-col gap-2 w-full px-4 py-5 border rounded-2xl shadow"
          >
            {/* 주문일 + 상세보기 버튼 */}
            <div className="w-full flex justify-between items-center">
              <p className="font-bold">{order.orderDate?.slice(0, 10)} 주문</p>

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
              <div
                className="flex justify-between  items-center w-full px-10 py-5 border rounded-md "
                key={book.bookId}
              >
                {/* 주문 아이템 상세 정보 */}
                <div className="flex flex-col gap-2 cursor-pointer">
                  {/* 배송 상태 */}
                  <div className="flex gap-1 items-end">
                    {/* 배송 도착일이 2틀 뒤인데 현재 날짜가 2틀뒤인 월,일 이 맞다면 이코드 어떻게 하지? */}
                    <p className="font-bold">{book.orderStatus}</p>
                    <small className="text-main">
                      {order.expectedArrivalDate} 도착 예정일
                    </small>
                  </div>

                  {/* 책 이미지 + 작가 + 책 줄거리 + 책 가격 + 책 수량 */}
                  <div className="flex justify-center items-center gap-4">
                    {/* 이미지 */}
                    <div className="w-[160px] h-[160px] overflow-hidden border shadow relative">
                      <Image
                        alt={`${book.thumbnail}`}
                        src={book.thumbnail ?? ""}
                        fill
                        priority
                      />
                    </div>
                    {/* 책 정보 */}
                    <div className="flex flex-col gap-2">
                      <p>{book.title}</p>
                      <p className="truncate text-sm max-w-[200px]">
                        {book.contents}
                      </p>
                      {/* 수량 가격 */}
                      <div className="flex gap-2  text-gray-400">
                        <small>{book.salePrice}원</small>
                        <small>{book.orderQuantity}개</small>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 리뷰 작성하기 버튼 */}
                <div className="">
                  <Button size="md">리뷰 작성하기</Button>
                </div>
              </div>
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
    </div>
  );
}
