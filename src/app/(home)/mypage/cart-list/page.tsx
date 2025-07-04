import React from "react";
import MyPageNav from "../_components/MyPageNav";

export default function CartListPage() {
  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex justify-center items-center px-2 py-10">
      <MyPageNav />
      <div className="min-h-[calc(100vh-200px)] flex-1/3">장바구니 </div>
    </div>
  );
}
