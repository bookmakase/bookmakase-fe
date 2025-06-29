import Link from "next/link";

export default function Header() {
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
        </div>
      </nav>
    </header>
  );
}
