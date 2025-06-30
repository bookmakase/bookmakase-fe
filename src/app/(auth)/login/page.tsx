"use client";

import Button from "@/components/ui/Button";
import InputFeild from "@/components/ui/InputFeild";
import { LoginInput, loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInput>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  /* 🔽 helper: 값이 비었으면 undefined  */
  const getStatus = (
    value: string,
    error: unknown | undefined
  ): "error" | "success" | undefined => {
    if (!value) return; // 빈 문자열 → 상태 없음
    return error ? "error" : "success";
  };

  const handleClickLogin = (data: LoginInput) => {
    console.log("로그인 : ", data);
  };

  const handleClickMoveRegister = () => {
    router.push("/register");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="font-semibold text-4xl">로그인</h1>

      <form
        onSubmit={handleSubmit(handleClickLogin)}
        className="flex flex-col gap-5"
      >
        {/* 이메일 필드 */}
        <div>
          <InputFeild
            id="email"
            type="email"
            labelText="이메일"
            placeholder="test@gmail.com"
            validationStatus={getStatus(emailValue, errors.email)}
            {...register("email")}
          />
          {errors.email && emailValue && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          {/* 비밀번호 필드 */}
          <InputFeild
            id="password"
            type="password"
            labelText="비밀번호"
            placeholder="********"
            validationStatus={getStatus(passwordValue, errors.password)}
            {...register("password")}
          />
          {errors.password && passwordValue && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button size="full">로그인</Button>
        <Button
          onClick={handleClickMoveRegister}
          size="full"
          variant="outline"
          color="violet"
          type="button"
        >
          회원가입
        </Button>
      </form>
    </div>
  );
}
