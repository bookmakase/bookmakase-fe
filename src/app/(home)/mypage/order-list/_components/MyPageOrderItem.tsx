"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/components/ui/Button";
import type { OrderItemResponse, OrderResponse } from "@/api/order";
import { usePostReview } from "@/hooks/mutation/useReview";

export default function MyPageOrderItem({
  book,
  isArrived,
  order,
  handleClickBookDetailMove,
}: {
  book: OrderItemResponse;
  isArrived: (dateStr?: string | null) => boolean;
  order: OrderResponse;
  handleClickBookDetailMove: (bookId: number) => void;
}) {
  const arrived = isArrived(order.expectedArrivalDate);
  const statusLabel = arrived ? "배송완료" : book.orderStatus;
  const dateLabel = arrived ? "도착 완료" : "도착 예정일";

  const [rating, setRating] = useState("0");
  const [content, setContent] = useState("");

  // api 훅
  const { mutate: postReviewMutate } = usePostReview();

  return (
    <div
      key={book.bookId}
      className="flex justify-between items-center w-full px-10 py-5 border rounded-md"
    >
      <div className="flex flex-col gap-2 cursor-pointer">
        <div className="flex gap-1 items-end">
          <p className="font-bold">{statusLabel}</p>
          <small className="text-main">
            {order.expectedArrivalDate?.slice(0, 10)} {dateLabel}
          </small>
        </div>

        <div
          className="flex justify-center items-center gap-4"
          onClick={() => handleClickBookDetailMove(book.bookId)}
        >
          <div className="w-[160px] h-[160px] overflow-hidden border shadow relative">
            <Image
              alt={`${book.thumbnail}`}
              src={book.thumbnail ?? ""}
              fill
              priority
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>{book.title}</p>
            <p className="truncate text-sm max-w-[200px]">{book.contents}</p>
            <div className="flex gap-2 text-gray-400">
              <small>{book.salePrice}원</small>
              <small>{book.orderQuantity}개</small>
            </div>
          </div>
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="md">리뷰 작성하기</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>리뷰 작성</DialogTitle>
            <DialogDescription>평점을 입력해주세요.</DialogDescription>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <label htmlFor="rating" className="sr-only">
                  Link
                </label>
                <input
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
            </div>
            <label
              htmlFor="review"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-4"
            >
              리뷰를 작성해주세요.
            </label>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                {/* <input id="review" value={content} onChange={(e) => setContent(e.target.value)} /> */}
                <textarea
                  id="review"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={5}
                  className="
                    border
                    border-gray-300
                    focus:border-blue-500
                    focus:ring-blue-500
                    rounded-md
                    p-2
                  "
                />
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                color="main"
                onClick={() =>
                  postReviewMutate({
                    bookId: book.bookId,
                    reviewReq: {
                      rating: parseInt(rating),
                      content,
                    },
                  })
                }
              >
                작성하기
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
