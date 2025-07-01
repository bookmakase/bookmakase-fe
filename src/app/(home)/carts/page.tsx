"use client";

import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  title: string;
  originalPrice: number;
  salePrice: number;
  imageUrl: string;
  quantity: number;
};

export default function OrdersPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showSummary, setShowSummary] = useState(true);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data: CartItem[]) => setCartItems(data))
      .catch((err) => console.error("장바구니 불러오기 실패:", err));
  }, []);

  const handleSelectAll = () => {
    setSelectedItems(
      selectedItems.length === cartItems.length
        ? []
        : cartItems.map((item) => item.id)
    );
  };

  const handleToggleItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleDeleteSelected = () => {
    setCartItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  };

  const selectedCartItems = cartItems.filter((item) =>
    selectedItems.includes(item.id)
  );

  const totalOriginal = selectedCartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalSale = selectedCartItems.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0
  );
  const totalDiscount = totalOriginal - totalSale;
  const deliveryFee = totalSale > 0 ? 3000 : 0;
  const finalAmount = totalSale + deliveryFee;
  const rewardPoint = Math.floor(finalAmount * 0.01);

  return (
    <main
      className={`w-full min-h-[calc(100vh-120px)] flex justify-center items-start py-10 px-4 bg-white ${
        !showSummary ? "max-w-screen-xl" : ""
      }`}
    >
      <div
        className={`w-full ${
          !showSummary ? "max-w-screen-xl" : "max-w-7xl"
        } flex flex-col gap-12`}
      >
        <div className="flex gap-6">
          <aside className="w-52 bg-white border p-4 text-sm">
            <div className="text-center text-[#00C471] font-semibold">
              [SideNav 자리]
            </div>
          </aside>

          <section
            className={`flex-1 space-y-6 ${
              showSummary ? "pr-[340px]" : "pr-0"
            }`}
          >
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold">장바구니</h2>
              {cartItems.length > 0 && (
                <div className="text-xs text-gray-500 space-x-3">
                  <button
                    className="border px-2 py-1 rounded hover:bg-gray-100"
                    onClick={handleDeleteSelected}
                  >
                    삭제
                  </button>
                  <button className="border px-2 py-1 rounded hover:bg-gray-100">
                    구매확인
                  </button>
                  <button className="border px-2 py-1 rounded hover:bg-gray-100">
                    엑셀 다운로드
                  </button>
                </div>
              )}
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={
                  selectedItems.length === cartItems.length &&
                  cartItems.length > 0
                }
                onChange={handleSelectAll}
              />
              전체
            </label>

            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center py-10">
                  장바구니에 담긴 상품이 없습니다.
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-start border-b pb-4"
                  >
                    <input
                      type="checkbox"
                      className="mt-2 accent-[#00C471]"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleToggleItem(item.id)}
                    />
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-28 h-40 bg-gray-200"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500 line-through">
                        {item.originalPrice.toLocaleString()}원
                      </p>
                      <p className="text-[#00C471] font-bold">
                        {item.salePrice.toLocaleString()}원
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center border rounded-full"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center border rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <section className="w-full space-y-10">
          <div className="border border-[#00C471] p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">📚 새로운 책 추천</h3>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="min-w-[150px] bg-white border border-gray-200 p-4 rounded text-center text-gray-500"
                  >
                    추천 도서 자리 #{i}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-[#00C471] p-4 rounded">
            <h3 className="text-lg font-semibold mb-4">📚 인기 많은 책 추천</h3>
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="min-w-[150px] bg-white border border-gray-200 p-4 rounded text-center text-gray-500"
                  >
                    추천 도서 자리 #{i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {showSummary && (
        <div className="fixed top-24 right-10 w-80 bg-white border rounded-lg shadow-xl p-6 z-50 text-sm">
          <p className="font-bold text-lg mb-3">🧾 주문 요약</p>
          <div className="mb-1">
            상품 금액{" "}
            <span className="float-right font-medium">
              {totalSale.toLocaleString()}원
            </span>
          </div>
          <div className="mb-1">
            배송비{" "}
            <span className="float-right font-medium">
              {deliveryFee.toLocaleString()}원
            </span>
          </div>
          <div className="mb-1">
            상품 할인{" "}
            <span className="float-right text-red-500">
              -{totalDiscount.toLocaleString()}원
            </span>
          </div>
          <hr className="my-3" />
          <div className="font-bold mb-1">
            결제 예정금액{" "}
            <span className="float-right text-[#00C471]">
              {finalAmount.toLocaleString()}원
            </span>
          </div>
          <div className="text-xs text-gray-500 mb-4">
            적립 예정 포인트: {rewardPoint}P
          </div>
          <button className="w-full bg-[#00C471] text-white py-2 rounded hover:bg-[#00b660] transition">
            구매하기
          </button>
        </div>
      )}

      <button
        onClick={() => setShowSummary((prev) => !prev)}
        className="fixed top-20 right-10 bg-[#00C471] text-white px-3 py-1 rounded z-50"
      >
        {showSummary ? "Hide Summary" : "Show Summary"}
      </button>
    </main>
  );
}
