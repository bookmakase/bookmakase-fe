"use client";

interface CartBook {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartItemProps {
  book: CartBook;
}

export default function CartItem({ book }: CartItemProps) {
  return (
    <div className="flex justify-between items-center border p-4 rounded">
      <div className="flex items-center gap-4">
        <input type="checkbox" />
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h2 className="font-semibold">{book.title}</h2>
          <p className="text-gray-500">₩{book.price.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-2 py-1 border rounded">-</button>
        <span>{book.quantity}</span>
        <button className="px-2 py-1 border rounded">+</button>
      </div>
    </div>
  );
}
