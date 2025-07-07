import Button from "@/components/ui/Button";

export default function OrderSummary() {
  return (
    <section>
      <h2 className="font-bold text-lg mb-3">결제 요약</h2>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between">
          <span>상품 금액</span>
          <span>34,700원</span>
        </div>
        <div className="flex justify-between">
          <span>배송비</span>
          <span>0원</span>
        </div>
        <div className="flex justify-between">
          <span>포인트 사용</span>
          <span>100P</span>
        </div>
        <hr />
        <div className="flex justify-between font-bold text-lg">
          <span>최종 결제 금액</span>
          <span>34,600원</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>적립 예정포인트</span>
          <span>347P</span>
        </div>
      </div>
      <Button variant="fill" color="main" size="md" className="w-full mt-4">
        결제하기
      </Button>
    </section>
  );
}
