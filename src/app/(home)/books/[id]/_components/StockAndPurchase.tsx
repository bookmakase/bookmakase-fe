"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { useOrderItemStore } from "@/store/useOrderItemStore";
import { calculatePoint } from "@/utils/pointUtils";
import Button from "@/components/ui/Button";
import { useMyIntro } from "@/hooks/query/useMyInfo";
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
import { usePatchAddress } from "@/hooks/mutation/useInformationUser";

interface StockAndPurchaseProps {
  bookId: number;
  price: number | null;
  salePriceProp: number | null;
  status: string | null;
}

// 현재 재고가 없어 월요일에 이 부분에 대해 논의 필요
export default function StockAndPurchase({
  bookId,
  price,
  salePriceProp,
  status,
}: StockAndPurchaseProps) {
  const router = useRouter();

  // api 훅
  const { data: myInfo, isLoading, isError } = useMyIntro();
  const { mutate: patchAddressMutate } = usePatchAddress();

  // store
  const { isLogin } = useAuthStore();
  const { addSelectedItem, clearItems, setOrderFlowActive } =
    useOrderItemStore();

  // 변수
  const salePrice = salePriceProp ? salePriceProp : 0;
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(salePrice);
  const [address, setAddress] = useState("");

  const isPurchasable = status === "정상판매";
  const earningPoint = calculatePoint(price ? price : 0);

  useEffect(() => {
    if (myInfo) {
      setAddress(myInfo.address);
    }
  }, [myInfo]);

  if (isLoading) {
    return <div className="text-center text-gray-400 py-8">로딩 중...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-400 py-8">
        주문자 정보가 정확하지 않습니다.
      </div>
    );
  }

  // 메서드
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      alert("최소 수량은 1입니다.");
      setQuantity(1);
      setTotalPrice(salePrice);
    } else {
      setQuantity(quantity - 1);
      setTotalPrice(totalPrice - salePrice);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    setTotalPrice(totalPrice + salePrice);
  };

  const goToOrdersPage = () => {
    // 기존 orderItem 저장소 삭제
    clearItems();

    // 저장소에 새로운 주문 추가
    addSelectedItem(bookId, quantity);

    // 올바른 경로로 접속하는지 확인
    setOrderFlowActive(true);
    router.push("/orders");
  };

  return (
    <div
      className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xs md:max-w-sm border border-gray-100 flex flex-col gap-6 sticky md:top-24 md:self-start"
      style={{ minWidth: 280 }}
    >
      {/* 가격 영역 */}
      <div className="flex flex-col gap-1">
        <span className="font-bookk-bold text-2xl text-main">
          {salePrice.toLocaleString()}원
        </span>
        {price && (
          <span className="text-dark-gray line-through text-base">
            {price.toLocaleString()}원
          </span>
        )}
      </div>
      <hr className="my-1 border-gray-200" />
      {/* 포인트 */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">적립 포인트</span>
        <span className="font-semibold text-point">
          {earningPoint.toLocaleString()}P
        </span>
      </div>
      <hr className="my-1 border-gray-200" />
      {/* 배송 안내 */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">배송안내</span>
          <span className="font-semibold text-main">무료배송</span>
        </div>
        {isLogin && (
          <div className="flex items-center justify-between gap-2">
            <span className="text-dark-gray">{myInfo.address}</span>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" color="main" rounded="full">
                  변경
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>배송지 변경</DialogTitle>
                  <DialogDescription>
                    아래 입력칸에 새로운 배송지를 입력해주세요
                  </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                  <div className="grid flex-1 gap-2">
                    <label htmlFor="link" className="sr-only">
                      Link
                    </label>
                    <input
                      id="link"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      color="main"
                      onClick={() => patchAddressMutate(address)}
                    >
                      변경하기
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
      <hr className="my-1 border-gray-200" />
      {/* 수량 및 구매 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-lg font-bold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main cursor-pointer transition"
              aria-label="수량 감소"
              onClick={decreaseQuantity}
            >
              -
            </button>
            <div className="font-semibold text-lg w-6 text-center">
              {quantity}
            </div>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-lg font-bold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-main cursor-pointer transition"
              aria-label="수량 증가"
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
          <div className="font-bold text-main text-lg min-w-[80px] text-right">
            {totalPrice.toLocaleString()}원
          </div>
        </div>
        {isPurchasable ? (
          isLogin ? (
            <div className="flex gap-2 mt-2">
              <Button
                size="md"
                variant="outline"
                color="main"
                rounded="lg"
                className="flex-1"
              >
                장바구니
              </Button>
              <Button
                size="md"
                variant="fill"
                color="main"
                rounded="lg"
                className="flex-1 font-bold shadow-md hover:scale-[1.03] transition"
                onClick={goToOrdersPage}
              >
                구매하기
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-400 text-sm py-2">
              로그인 후 구매할 수 있습니다.
            </div>
          )
        ) : (
          <Button disabled size="lg" className="w-full mt-2">
            판매 중단
          </Button>
        )}
      </div>
    </div>
  );
}
