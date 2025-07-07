export default function OrderItem() {
  return (
    <div className="flex items-center gap-4 border-b pb-3 last:border-b-0">
      <div className="w-16 h-20 bg-gray-200 rounded" />
      <div className="flex-1">
        <div className="font-medium">도서 제목</div>
        <div className="text-xs text-gray-500">수량: 1</div>
      </div>
      <div className="font-bold">12,000원</div>
    </div>
  );
}
