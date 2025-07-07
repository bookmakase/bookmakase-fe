import OrderItem from "./OrderItem";

export default function OrderProductSection() {
  return (
    <section>
      <h2 className="font-bold text-lg mb-3">
        주문상품 <span className="text-sm text-gray-400">(총 n개)</span>
      </h2>
      <div className="flex flex-col gap-3">
        <OrderItem />
        {/* 여러 개 반복 */}
      </div>
    </section>
  );
}
