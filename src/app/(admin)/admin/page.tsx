"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();

  const handleClickMoveAddBook = () => {
    router.push("/admin/add-book");
  };

  const handleClickMoveEditBook = () => {
    router.push("/admin/edit-book");
  };

  return (
    <main className="w-full min-h-[calc(100vh-120px)] flex flex-col justify-center items-center">
      <h1>어드민 페이지</h1>
      <Button
        size="md"
        color="violet"
        variant="outline"
        onClick={handleClickMoveAddBook}
      >
        도서 추가
      </Button>

      <Button
        size="md"
        color="violet"
        variant="outline"
        onClick={handleClickMoveEditBook}
      >
        도서 수정
      </Button>
    </main>
  );
}
