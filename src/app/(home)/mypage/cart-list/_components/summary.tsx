interface CartBook {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface SummaryProps {
  cartBooks: CartBook[];
}

export default function Summary({ cartBooks }: SummaryProps) {
  const totalPrice = cartBooks.reduce(
    (sum, book) => sum + book.price * book.quantity,
    0
  );

  return (
    <div className="p-4 border rounded bg-gray-50">
      <div className="flex justify-between mb-4">
        <span className="font-semibold">총합계</span>
        <span className="font-bold text-lg">
          ₩{totalPrice.toLocaleString()}
        </span>
      </div>
      <div className="flex justify-between">
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          주문하기
        </button>
        <button className="px-4 py-2 border rounded">엑셀 다운로드</button>
      </div>
    </div>
  );
}
