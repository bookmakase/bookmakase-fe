import Link from "next/link";
import React from "react";

export default function MyPageNav() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col  items-center flex-2 border-r-2 gap-16 px-10">
      {/* 이미지 콘테이너 */}
      <div className="w-[190px] h-[190px] border-2 rounded-full ">이미지</div>

      {/* 마이페이지 네비 */}
      <nav className="flex flex-col items-center gap-6">
        <Link href={"/mypage"} className="border-b-2 w-full text-center">
          내 정보
        </Link>
        <Link
          href={"/mypage/cart-list"}
          className="border-b-2 w-full text-center"
        >
          찜 목록 페이지
        </Link>
        <Link
          href={"/mypage/order-list"}
          className="border-b-2 w-full text-center"
        >
          구매 목록 페이지
        </Link>
      </nav>
    </div>
  );
}
