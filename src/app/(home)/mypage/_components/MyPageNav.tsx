"use client";

import { useUpdateProfileImage } from "@/hooks/mutation/useUpdateProfileImage";
import { useMyIntro } from "@/hooks/query/useMyInfo";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";

export default function MyPageNav() {
  const { data } = useMyIntro();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { mutate } = useUpdateProfileImage();

  console.log(data);

  const handleClickEdit = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    console.log("선택된 파일 : ", file);

    mutate(file, {
      onSuccess: () => {
        toast.success("이미지 업로드 성공했습니다!");
        queryClient.invalidateQueries({ queryKey: ["myIntro"] });
      },
      onError: () => {
        alert("이미지 업로드 실패...");
      },
    });
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col  items-center flex-1 border-r-2 gap-16 px-2 py-20">
      {/* 이미지 콘테이너 */}
      <div className="p-2 relative">
        <div className="relative w-[190px] h-[190px] border-2 rounded-full overflow-hidden">
          <Image
            alt="프로필 이미지"
            src={
              data.imageUrl || previewUrl || "/images/profile-image-default.jpg"
            }
            fill
            priority
            className="object-cover"
          />
        </div>

        <FaRegEdit
          size={42}
          onClick={handleClickEdit}
          className="
          absolute bottom-6 right-2
          text-black drop-shadow-sm /* 배경 밝으면 테두리 주기 */
          z-10                     /* 이미지 위로 올라오게 */
          cursor-pointer
        "
        />

        {/* 숨겨진 파일 업로드 input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
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
