"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useGetBookDetail } from "@/hooks/query/useBook";
import { useOrderStore } from "@/store/useOrderStore";

type OrderItemProps = {
  bookId: number;
  quantity: number;
};

export default function OrderItem({ bookId, quantity }: OrderItemProps) {
  // store
  const { addOrderItem } = useOrderStore();

  // api
  const { data: bookInfo, isLoading, isError } = useGetBookDetail(bookId);

  useEffect(() => {
    if (bookInfo && !isLoading && !isError) {
      addOrderItem({
        bookId: bookInfo.bookId,
        title: bookInfo.title,
        contents: bookInfo.contents || "",
        salePrice: bookInfo.salePrice || 0,
        orderQuantity: quantity,
      });
    }
  }, [addOrderItem, bookInfo, bookId, quantity, isLoading, isError]);

  if (isLoading) {
    return <div className="text-center text-gray-400 py-8">로딩 중...</div>;
  }

  if (isError || bookInfo === undefined || bookInfo === null) {
    return (
      <div className="text-center text-red-400 py-8">
        도서 정보가 정확하지 않습니다.
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 border-b pb-3 last:border-b-0">
      {bookInfo.thumbnail ? (
        <Image
          src={bookInfo.thumbnail}
          alt={bookInfo.title}
          width={0}
          height={0}
          sizes="(max-width: 768px) 120px, (max-width: 1024px) 160px, 200px"
          className="w-16 h-20 rounded"
        />
      ) : (
        <div className="w-16 h-20 bg-gray-200 rounded" />
      )}
      <div className="flex-1">
        <div className="font-medium">{bookInfo.title}</div>
        <div className="text-xs text-gray-500">
          수량: {quantity.toLocaleString()}
        </div>
      </div>
      <div className="font-bold">
        {bookInfo.salePrice
          ? (bookInfo.salePrice * quantity).toLocaleString()
          : 0}
        원
      </div>
    </div>
  );
}
