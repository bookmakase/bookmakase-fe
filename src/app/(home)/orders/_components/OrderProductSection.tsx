"use client";

import OrderItem from "./OrderItem";
import { useOrderItemStore } from "@/store/useOrderItemStore";

export default function OrderProductSection() {
  // store
  const { selectedOrderItems } = useOrderItemStore();
  console.log(selectedOrderItems);

  // 메서드
  const calculateTotalQuantity = () => {
    return selectedOrderItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <section>
      <h2 className="font-bold text-lg mb-3">
        주문상품{" "}
        <span className="text-sm text-gray-400">
          (총 {calculateTotalQuantity().toLocaleString()}개)
        </span>
      </h2>
      <div className="flex flex-col gap-3">
        {selectedOrderItems.map((item, idx) => (
          <OrderItem key={idx} bookId={item.bookId} quantity={item.quantity} />
        ))}
      </div>
    </section>
  );
}
