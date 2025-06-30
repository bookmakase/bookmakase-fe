"use client";

import InputFeild from "@/components/ui/InputFeild";
import React from "react";

export default function LoginPage() {
  const handleClickLogin = () => {
    alert("클릭");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="font-semibold text-4xl">로그인</h1>

      <form onSubmit={handleClickLogin} className="flex flex-col gap-5">
        {/* 이메일 필드 */}
        <InputFeild
          id="email"
          name="email"
          type="email"
          labelText="이메일"
          placeholder="test@gmail.com"
        />

        {/* 비밀번호 필드 */}
        <InputFeild
          id="email"
          name="email"
          type="email"
          labelText="이메일"
          placeholder="test@gmail.com"
        />
      </form>
    </div>
  );
}
