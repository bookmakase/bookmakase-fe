import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegEdit } from "react-icons/fa";

export default function MyPageNav() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col  items-center flex-4/12 border-r-2 gap-16 px-2 py-20">
      {/* 이미지 콘테이너 */}
      <div className="p-2 relative">
        <div className="relative w-[190px] h-[190px] border-2 rounded-full overflow-hidden">
          <Image
            alt="프로필 이미지"
            src={"/images/profile-image-default.jpg"}
            fill
            priority
            className="object-contain"
          />
        </div>

        <FaRegEdit
          size={42}
          className="
          absolute bottom-6 right-2
          text-black drop-shadow-sm /* 배경 밝으면 테두리 주기 */
          z-10                     /* 이미지 위로 올라오게 */
          cursor-pointer
        "
        />
      </div>

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
