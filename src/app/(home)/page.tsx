import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
    return (
        <main className="w-full min-h-[calc(100vh-120px)] flex flex-col gap-10 justify-center items-center">
            <Button color="cancel" variant="outline">
                버튼
            </Button>
            <Link href={"/admin/books"} className="font-bookk-bold">
                관리자 페이지 이동
            </Link>

            <h1>메인 홈 화면</h1>
        </main>
    );
}