"use client";

import { useEffect } from "react";
import { notFound } from "next/navigation";
import { useOrderItemStore } from "@/store/useOrderItemStore";

export default function OrdersPage() {
  // store
  const { isOrderFlowActive, setOrderFlowActive } = useOrderItemStore();

  /**
   * 정상적인 경로로 접근 시 정상적인 주문페이지 호출
   * ex) 도서 상세페이지에서 주문페이지로, 장바구니에서 주문페이지로
   *
   * 주문페이지를 벗어날경우 확인용 flag를 다시 false로 변경
   */
  useEffect(() => {
    setOrderFlowActive(true);

    // 주문페이지를 벗어날 때
    return () => {
      setOrderFlowActive(false);
    };
  }, [setOrderFlowActive]);

  if (!isOrderFlowActive) {
    notFound();
  }

  return (
    <main className="w-full min-h-[calc(100vh-120px)] flex flex-col justify-center items-center">
      주문 페이지
    </main>
  );
}
