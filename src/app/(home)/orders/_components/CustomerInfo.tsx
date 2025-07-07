export default function CustomerInfo() {
  return (
    <section>
      <h2 className="font-bold text-lg mb-3">주문자 정보</h2>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">주문자</span>
          <span className="font-medium">차민재</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">연락처</span>
          <span className="font-medium">010-xxxx-xxxx</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">배송지</span>
          <span className="font-medium">서울특별시 관악구 봉천동</span>
        </div>
      </div>
    </section>
  );
}
