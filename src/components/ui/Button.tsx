import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?:
    | "sm"
    | "md"
    | "md-70"
    | "md-full"
    | "lg-24"
    | "lg"
    | "lg-full"
    | "full";
  variant?: "fill" | "outline";
  color?: "main" | "cancel" | "violet";
  rounded?: "sm" | "md" | "lg" | "full";
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export default function Button({
  size = "sm",
  variant = "fill",
  color = "main",
  rounded = "sm",
  className,
  isLoading = false,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "font-medium transition-all duration-300 relative",
        "disabled:cursor-not-allowed enabled:cursor-pointer",

        // 둥근 정도 설정
        rounded === "sm" && "rounded-sm",
        rounded === "md" && "rounded-md",
        rounded === "lg" && "rounded-xl",
        rounded === "full" && "rounded-full",

        // 사이즈 설정
        size === "sm" && "w-[70px] h-10 text-sm",
        size === "md" && "w-[150px] h-10 text-sm",
        size === "md-70" && "w-[70px] h-10 text-md",
        size === "md-full" && "w-full h-10 text-sm",
        size === "lg-24" && "w-24 h-12 text-base",
        size === "lg" && "w-[300px] h-12 text-base",
        size === "lg-full" && "w-full h-12 text-base",
        size === "full" && "w-full h-12 text-lg",

        // 스타일 및 컬러
        variant === "fill" &&
          color === "main" &&
          "bg-main text-white hover:bg-main/90 active:bg-main/80", // ✅ 변경
        variant === "fill" &&
          color === "cancel" &&
          "bg-cancel text-white hover:bg-cancel/90 active:bg-cancel/80",

        variant === "outline" &&
          color === "main" &&
          "border border-main text-main bg-[rgba(255,255,255,0.1)] hover:bg-main hover:text-white active:bg-main/80", // ✅ 변경
        variant === "outline" &&
          color === "cancel" &&
          "border border-cancel text-cancel bg-[rgba(255,255,255,0.1)] hover:bg-cancel hover:text-white active:bg-cancel",

        // disabled 스타일 (색, 투명도)
        "disabled:bg-gray-300 disabled:opacity-50 hover:disabled:bg-gray-300",

        // 사용자 커스텀 클래스
        className
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      <span className={clsx(isLoading && "invisible")}>{children}</span>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </button>
  );
}
