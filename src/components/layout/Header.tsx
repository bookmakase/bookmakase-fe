"use client";

import Link from "next/link";
import Button from "../ui/Button";
import { useLogout } from "@/hooks/mutation/useLogout";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/api/user";
import { User } from "@/types/user";

export default function Header() {
  const router = useRouter();
  const { mutate, isPending } = useLogout();
  const { isLogin, setAuth, role } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  // console.log("user : ", user);

  const isAdmin = role === "ROLE_ADMIN";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    (async () => {
      try {
        const data = await getUserInfo();
        setUser(data);
        setAuth({ isLogin: true, role: data.role });
      } catch (err) {
        console.error("내 정보 조회 실패 : ", err);
      }
    })();
  }, []);

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
      <nav className="w-full h-full flex justify-between items-center px-32">
        <Link href="/" className="text-xl font-bold">
          BOOKMAKASE
        </Link>

        {!isLogin && (
          <div className="flex gap-4">
            <Button onClick={() => router.push("/login")}>로그인</Button>
            <Button variant="outline" onClick={() => router.push("/register")}>
              회원가입
            </Button>
          </div>
        )}

        {/* ② 일반 사용자 ---------------------------------- */}
        {isLogin && !isAdmin && (
          <div className="flex items-center gap-8">
            <Link href="/orders" aria-label="주문 내역">
              <ShoppingCartIcon className="w-6 h-6" />
            </Link>
            <Link href="/mypage" aria-label="마이 페이지">
              <UserIcon className="w-6 h-6" />
            </Link>
            <Button
              onClick={handleClickLogout}
              disabled={isPending}
              variant="outline"
              color="cancel"
            >
              {isPending ? "..." : "로그아웃"}
            </Button>
          </div>
        )}

        {/* ③ 관리자 -------------------------------------- */}
        {isLogin && isAdmin && (
          <div className="flex items-center gap-8">
            <Link href="/admin/books" className="font-semibold">
              관리자 페이지
            </Link>
            <Link href="/mypage" aria-label="마이 페이지">
              <UserIcon className="w-6 h-6" />
            </Link>
            <Button
              onClick={handleClickLogout}
              disabled={isPending}
              variant="outline"
              color="cancel"
            >
              {isPending ? "..." : "로그아웃"}
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
