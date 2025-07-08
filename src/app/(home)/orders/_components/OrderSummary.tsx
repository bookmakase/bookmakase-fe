"use client";

import Button from "@/components/ui/Button";
import { useOrderStore } from "@/store/useOrderStore";
import { usePostOrder } from "@/hooks/mutation/useOrder";

export default function OrderSummary() {
  // store
  const {
    deliveryPrice,
    usedPoint,
    earningPoint,
    totalPrice,
    totalQuantity,
    paymentMethod,
    orderAddress,
    orderItems,
  } = useOrderStore();
  const paymentAmount = totalPrice + deliveryPrice - usedPoint;

  // 주문 요청 훅
  const { mutate: postOrderMutate } = usePostOrder();

  return (
    <section>
      <h2 className="font-bold text-lg mb-3">결제 요약</h2>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span>상품 금액</span>
          <span>{totalPrice.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span>배송비</span>
          <span>{deliveryPrice.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between">
          <span>포인트 사용</span>
          <span>{usedPoint.toLocaleString()}P</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-lg">
          <span>최종 결제 금액</span>
          <span>{paymentAmount.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>적립 예정포인트</span>
          <span>{earningPoint.toLocaleString()}P</span>
        </div>
      </div>
      <Button
        variant="fill"
        color="main"
        size="md"
        className="w-full mt-4"
        onClick={() =>
          postOrderMutate({
            totalPrice,
            totalQuantity,
            paymentMethod,
            orderAddress,
            usedPoint,
            earningPoint,
            deliveryPrice,
            orderItems,
          })
        }
      >
        결제하기
      </Button>
    </section>
  );
}
