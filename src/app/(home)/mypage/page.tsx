import React from "react";
import MyPageNav from "./_components/MyPageNav";

export default function MyPage() {
  return (
    <div className="w-full min-h-[calc(100vh-120px)] flex justify-center items-center px-20 py-10">
      <MyPageNav />
      <div className="min-h-[calc(100vh-200px)] flex-5">내정보</div>
    </div>
  );
}
