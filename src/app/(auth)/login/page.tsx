"use client";

import { GoogleIcon } from "@/components/icons/GoogleIcon";
import Button from "@/components/ui/Button";
import InputFeild from "@/components/ui/InputFeild";
import { LoginInput, loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Github } from "lucide-react";
import { KakaoIcon } from "@/components/icons/KakaoIcon";
import { useLogin } from "@/hooks/mutation/useLogin";
import { useAuthStore } from "@/store/auth";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
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
    mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: ({ accessToken, refreshToken }) => {
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          useAuthStore.getState().setLogin(true);

          toast.success("로그인 완료! 메인 페이지로 이동합니다.");
          router.push("/");
        },
      }
    );
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

        <Button size="full" disabled={!isValid || isPending}>
          {isPending ? "처리 중..." : "로그인"}
        </Button>
        <Button
          onClick={handleClickMoveRegister}
          size="full"
          variant="outline"
          color="main"
          type="button"
        >
          회원가입
        </Button>
      </form>

      {/* 로그인, 구글 버튼 */}
      {/* 구분선 */}
      <div className="relative my-6 w-full">
        <hr className="border-t border-gray-200" />
        <span className="absolute left-1/2 -top-3 transform -translate-x-1/2 bg-white px-2 text-sm text-gray-500 whitespace-nowrap">
          또는 소셜 계정으로 로그인
        </span>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {/* Google */}

        <button
          aria-label="Google로 로그인"
          className="flex gap-3 border px-6 py-3 justify-center items-center cursor-pointer shadow"
        >
          <GoogleIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Google로 계속하기</span>
        </button>

        {/* GitHub */}
        <button
          aria-label="GitHub로 로그인"
          className="flex gap-3 border px-6 py-3 justify-center items-center cursor-pointer shadow"
        >
          <Github className="w-5 h-5" />
          <span className="text-sm font-medium">GitHub로 계속하기</span>
        </button>

        {/* Kakao */}
        <button
          aria-label="Kakao로 로그인"
          className="flex gap-3 border px-6 py-3 justify-center items-center cursor-pointer shadow"
        >
          <KakaoIcon className="w-5 h-5" />
          <span className="text-sm font-medium">Kakao로 계속하기</span>
        </button>
      </div>
    </div>
  );
}
