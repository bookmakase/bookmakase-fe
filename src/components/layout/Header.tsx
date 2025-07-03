"use client";

import Link from "next/link";
import Button from "../ui/Button";
import { useLogout } from "@/hooks/mutation/useLogout";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const router = useRouter();
  const { mutate, isPending } = useLogout();
  const isLogin = useAuthStore((s) => s.isLogin);

  const handleClickLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      alert("리프레쉬 토큰이 없습니다. 다시 로그인 해주세요.");
      return;
    }

    mutate(refreshToken);
    router.push("/");
  };

  const handleClickMoveLogin = () => {
    router.push("/login");
  };

  const handleClickMoveRegister = () => {
    router.push("/register");
  };

  return (
    <header className="w-full h-[60px] flex flex-col border-b bg-background">
      <nav className="w-full h-full flex justify-around items-center">
        <Link href="/" className="text-xl font-bold">
          BOOKMAKASE
        </Link>
        <div className="flex gap-4">
          {isLogin ? (
            <div className="flex justify-center items-center gap-8">
              {/* 주문 페이지 */}
              <Link href="/orders" aria-label="주문 내역">
                <ShoppingCartIcon className="w-6 h-6" />
              </Link>

              {/* 마이 페이지 */}
              <Link href="/mypage" aria-label="마이 페이지">
                <UserIcon className="w-6 h-6" />
              </Link>

              {/* 로그아웃 버튼 */}
              <Button
                onClick={handleClickLogout}
                disabled={isPending}
                variant="outline"
                color="cancel"
              >
                {isPending ? "..." : "로그아웃"}
              </Button>
            </div>
          ) : (
            <>
              <Button onClick={handleClickMoveLogin}>로그인</Button>
              <Button variant="outline" onClick={handleClickMoveRegister}>
                회원가입
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
