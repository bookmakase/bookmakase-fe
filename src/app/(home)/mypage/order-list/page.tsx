"use client";

import React from "react";
import MyPageNav from "../_components/MyPageNav";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function OrderListPage() {
  const router = useRouter();

  const handleClickMoveOrderDetail = () => {
    router.push(`/mypage/order-list/2`);
  };

  const handleClickMoveBookReview = () => {
    alert("리뷰 작성하기 모달 오픈!!");
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex justify-center items-center px-20 py-10">
      <MyPageNav />
      <div className="min-h-[calc(100vh-200px)] flex-5">
        <p>구매 목록 페이지</p>
        <Button size="md" onClick={handleClickMoveOrderDetail}>
          주문 상세 보기
        </Button>
        <Button
          size="md"
          variant="outline"
          color="violet"
          onClick={handleClickMoveBookReview}
        >
          리뷰 작성하기
        </Button>
      </div>
    </div>
  );
}
