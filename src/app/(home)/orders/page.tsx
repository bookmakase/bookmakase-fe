"use client";

import { useEffect } from "react";
// import { notFound } from "next/navigation";
import { useOrderItemStore } from "@/store/useOrderItemStore";
import OrderSummary from "./_components/OrderSummary";
import CustomerInfo from "./_components/CustomerInfo";
import OrderProductSection from "./_components/OrderProductSection";
import PointSelection from "./_components/PointSelection";
import PaymentSelection from "./_components/PaymentSelection";
import { useMyIntro } from "@/hooks/query/useMyInfo";

export default function OrdersPage() {
  // store
  // const { isOrderFlowActive, setOrderFlowActive } = useOrderItemStore();
  const { setOrderFlowActive } = useOrderItemStore();

  // api 훅
  const { data: myInfo, isLoading, isError } = useMyIntro();

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

  // if (!isOrderFlowActive) {
  //   notFound();
  // }

  if (isLoading) {
    return <div className="text-center text-gray-400 py-8">로딩 중...</div>;
  }

  if (isError || myInfo === undefined || myInfo === null) {
    return (
      <div className="text-center text-red-400 py-8">
        주문자 정보가 정확하지 않습니다.
      </div>
    );
  }

  return (
    <main className="w-full min-h-[calc(100vh-120px)] flex justify-center items-start bg-gray-50 py-10">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* 왼쪽: 주문 정보 */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col gap-8">
          <CustomerInfo
            username={myInfo.username}
            phone={myInfo.phone}
            address={myInfo.address}
          />
          <hr />
          <OrderProductSection />
          <hr />
          <PointSelection point={myInfo.point} />
          <hr />
          <PaymentSelection />
        </div>
        {/* 오른쪽: 결제 요약 */}
        <div className="w-full lg:w-[340px] flex-shrink-0">
          <div className="sticky top-24 bg-white rounded-xl shadow-lg p-8">
            <OrderSummary />
          </div>
        </div>
      </div>
    </main>
  );
}
