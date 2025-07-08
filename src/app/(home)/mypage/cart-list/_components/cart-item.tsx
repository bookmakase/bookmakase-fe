"use client";

interface CartBook {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

interface CartItemProps {
  book: CartBook;
  onQuantityChange: (id: number, delta: number) => void;
}

export default function CartItem({ book, onQuantityChange }: CartItemProps) {
  return (
    <div className="flex justify-between items-center border p-4 rounded">
      <div>
        <h2 className="font-semibold">{book.title}</h2>
        <p className="text-gray-500">₩{book.price.toLocaleString()}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onQuantityChange(book.id, -1)}
          className="px-2 py-1 border rounded"
        >
          -
        </button>
        <span>{book.quantity}</span>
        <button
          onClick={() => onQuantityChange(book.id, 1)}
          className="px-2 py-1 border rounded"
        >
          +
        </button>
      </div>
    </div>
  );
}
