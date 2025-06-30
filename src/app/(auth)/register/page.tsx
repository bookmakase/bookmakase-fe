"use client";

import Button from "@/components/ui/Button";
import InputFeild from "@/components/ui/InputFeild";
import { RegisterInput, registerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<RegisterInput>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmValue = watch("confirm");
  const nicknameValue = watch("nickname");

  const getStatus = (
    value: string,
    error: unknown | undefined
  ): "error" | "success" | undefined => {
    if (!value) return;

    return error ? "error" : "success";
  };

  const handleClickRegister = (data: RegisterInput) => {
    console.log("회원가입 : ", data);
    router.push("/login");
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="font-semibold text-4xl">회원가입</h1>

      <form
        onSubmit={handleSubmit(handleClickRegister)}
        className="flex flex-col gap-5"
      >
        {/* 이메일 필드 */}
        <div>
          <InputFeild
            id="email"
            labelText="이메일"
            type="email"
            placeholder="test@gmail.com"
            validationStatus={getStatus(emailValue, errors.email)}
            {...register("email")}
          />
          {errors.email && emailValue && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* 비밀번호 필드 */}
        <div>
          <InputFeild
            id="password"
            labelText="비밀번호"
            type="password"
            placeholder="********"
            validationStatus={getStatus(passwordValue, errors.password)}
            {...register("password")}
          />
          {errors.password && passwordValue && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* 비밀번호 확인 필드 */}
        <div>
          <InputFeild
            id="confirm"
            labelText="비밀번호 확인"
            type="password"
            placeholder="********"
            validationStatus={getStatus(confirmValue, errors.confirm)}
            {...register("confirm")}
          />
          {errors.confirm && confirmValue && (
            <p className="text-sm text-red-500">{errors.confirm.message}</p>
          )}
        </div>

        {/* 닉네임 필드 */}
        <div>
          <InputFeild
            id="nickname"
            labelText="닉네임"
            type="text"
            placeholder="새싹어린이"
            validationStatus={getStatus(nicknameValue, errors.nickname)}
            {...register("nickname")}
          />
          {errors.nickname && nicknameValue && (
            <p className="text-sm text-red-500">{errors.nickname.message}</p>
          )}
        </div>

        <Button size="full" disabled={!isValid}>
          회원가입
        </Button>
      </form>
    </div>
  );
}
