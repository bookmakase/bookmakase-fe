"use client";

import React, { useState } from "react";
import MyPageNav from "../_components/MyPageNav";
import Button from "@/components/ui/Button";
import Image from "next/image";

const bookDummy = [
  {
    orderId: 1,
    bookId: 1,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 중",
    bookTitle: "혼모노",
    content: "책 줄거리...",
    bookPrice: 13000,
    quantity: 1,
    imgUrl: "",
  },
  {
    orderId: 2,
    bookId: 2,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 완료",
    bookTitle: "자바스크립트",
    content: "책 줄거리...",
    bookPrice: 23000,
    quantity: 1,
    imgUrl: "",
  },
  {
    orderId: 3,
    bookId: 2,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 완료",
    bookTitle: "자바스크립트",
    content: "책 줄거리...",
    bookPrice: 23000,
    quantity: 1,
    imgUrl: "",
  },
  {
    orderId: 4,
    bookId: 2,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 완료",
    bookTitle: "자바스크립트",
    content: "책 줄거리...",
    bookPrice: 23000,
    quantity: 1,
    imgUrl: "",
  },
  {
    orderId: 5,
    bookId: 2,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 완료",
    bookTitle: "자바스크립트",
    content: "책 줄거리...",
    bookPrice: 23000,
    quantity: 1,
    imgUrl: "",
  },
  {
    orderId: 6,
    bookId: 2,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 완료",
    bookTitle: "자바스크립트",
    content: "책 줄거리...",
    bookPrice: 23000,
    quantity: 1,
    imgUrl: "",
  },
  {
    orderId: 7,
    bookId: 2,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 완료",
    bookTitle: "자바스크립트",
    content: "책 줄거리...",
    bookPrice: 23000,
    quantity: 1,
    imgUrl: "",
  },
  {
    orderId: 8,
    bookId: 2,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 완료",
    bookTitle: "자바스크립트",
    content: "책 줄거리...",
    bookPrice: 23000,
    quantity: 1,
    imgUrl: "",
  },
  {
    orderId: 9,
    bookId: 2,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 완료",
    bookTitle: "자바스크립트",
    content: "책 줄거리...",
    bookPrice: 23000,
    quantity: 1,
    imgUrl: "",
  },
  {
    orderId: 10,
    bookId: 2,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 완료",
    bookTitle: "자바스크립트",
    content: "책 줄거리...",
    bookPrice: 23000,
    quantity: 1,
    imgUrl: "",
  },
  {
    orderId: 11,
    bookId: 2,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 완료",
    bookTitle: "자바스크립트",
    content: "책 줄거리...",
    bookPrice: 23000,
    quantity: 1,
    imgUrl: "",
  },
  {
    orderId: 12,
    bookId: 2,
    orderDate: "2025.06.23",
    deleveryStatus: "배송 완료",
    bookTitle: "자바스크립트",
    content: "책 줄거리...",
    bookPrice: 23000,
    quantity: 1,
    imgUrl: "",
  },
];

export default function OrderListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bookDummy.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(bookDummy.length / itemsPerPage);

  const goPage = (p: number) => setCurrentPage(p);
  const goNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const goPrev = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex  px-2 py-10">
      <MyPageNav />

      {/* 구매목록 콘텐츠 */}
      <div className="min-h-[calc(100vh-200px)] flex-1/3  flex flex-col px-12 py-3 gap-4">
        {/* 아이템 */}
        {currentItems.map((item) => (
          <section
            key={item.orderId}
            className="flex flex-col gap-2 w-full px-4 py-5 border rounded-2xl shadow"
          >
            {/* 주문일 + 상세보기 버튼 */}
            <div className="w-full flex justify-between items-center">
              <p className="font-bold">{item.orderDate} 주문</p>

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
            <div className="flex justify-between  items-center w-full px-10 py-5 border rounded-md ">
              {/* 주문 아이템 상세 정보 */}
              <div className="flex flex-col gap-2 cursor-pointer">
                {/* 배송 상태 */}
                <div className="flex gap-1 items-end">
                  <p className="font-bold">{"배송 중"}</p>
                  <small className="text-main">{"6월26일 도착 예정"}</small>
                </div>

                {/* 책 이미지 + 작가 + 책 줄거리 + 책 가격 + 책 수량 */}
                <div className="flex justify-center items-center gap-4">
                  {/* 이미지 */}
                  <div className="w-[120px] h-[120px] overflow-hidden border shadow relative">
                    <Image
                      alt={item.bookTitle}
                      src={"/images/profile-image-default.jpg"}
                      fill
                      priority
                    />
                  </div>
                  {/* 책 정보 */}
                  <div className="flex flex-col gap-2">
                    <p>{item.bookTitle}</p>
                    <p>{item.content}</p>
                    {/* 수량 가격 */}
                    <div className="flex gap-2  text-gray-400">
                      <small>{item.bookPrice}원</small>
                      <small>{item.quantity}개</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* 리뷰 작성하기 버튼 */}
              <div className="">
                <Button size="md">리뷰 작성하기</Button>
              </div>
            </div>
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
