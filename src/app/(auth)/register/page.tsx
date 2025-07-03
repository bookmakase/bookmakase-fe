"use client";

import Button from "@/components/ui/Button";
import InputFeild from "@/components/ui/InputFeild";
import { useRegister } from "@/hooks/mutation/useRegister";
import { RegisterInput, registerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const router = useRouter();
  const { mutate, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<RegisterInput>({
    mode: "onChange",
    resolver: zodResolver(registerSchema),
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmValue = watch("confirmPassword");
  const usernameValue = watch("username");
  const phoneValue = watch("phone");

  const getStatus = (
    value: string,
    error: unknown | undefined
  ): "error" | "success" | undefined => {
    if (!value) return;

    return error ? "error" : "success";
  };

  const handleClickRegister = (data: RegisterInput) => {
    mutate(
      {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        username: data.username,
        phone: data.phone,
      },
      {
        onSuccess: () => {
          alert("회원가입 완료! 로그인 페이지로 이동합니다.");
          router.push("/login");
        },
        onError: () => {
          alert("회원가입 실패... 다시 시도해 주세요.");
        },
      }
    );
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
            validationStatus={getStatus(confirmValue, errors.confirmPassword)}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && confirmValue && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* 닉네임 필드 */}
        <div>
          <InputFeild
            id="nickname"
            labelText="닉네임"
            type="text"
            placeholder="새싹어린이"
            validationStatus={getStatus(usernameValue, errors.username)}
            {...register("username")}
          />
          {errors.username && usernameValue && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* 전화번호 필드 */}
        <div>
          <InputFeild
            id="phone"
            labelText="전화번호"
            type="text"
            placeholder="010-xxxx-xxxx"
            validationStatus={getStatus(phoneValue, errors.phone)}
            {...register("phone")}
            onFocus={() => {
              if (getValues("phone") === "") {
                setValue("phone", "010-", { shouldDirty: true });
              }
            }}
            onBlur={() => {
              if (getValues("phone") === "010-") {
                setValue("phone", "", { shouldDirty: true });
              }
            }}
          />
          {errors.phone && phoneValue && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <Button size="full" disabled={!isValid || isPending}>
          {isPending ? "처리 중..." : "회원가입"}
        </Button>
      </form>
    </div>
  );
}
