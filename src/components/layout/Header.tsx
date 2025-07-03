"use client";

import Link from "next/link";
import Button from "../ui/Button";
import { useLogout } from "@/hooks/mutation/useLogout";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { mutate, isPending } = useLogout();

  const handleClickLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      alert("시간이 지나 로그아웃되었습니다.");
      return;
    }

    mutate(refreshToken);
    router.push("/");
  };

  return (
    <header className="w-full h-[60px] flex flex-col border-b bg-background">
      <nav className="w-full h-full flex justify-around items-center">
        <Link href="/" className="text-xl font-bold">
          BOOKMAKASE
        </Link>
        <div className="flex gap-4">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <Link href="/orders">Orders</Link>
          <Link href={"/mypage"}>MyPage</Link>
          <Button onClick={handleClickLogout} disabled={isPending}>
            {isPending ? "처리 중..." : "로그아웃"}
          </Button>
        </div>
      </nav>
    </header>
  );
}
