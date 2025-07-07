import Button from "@/components/ui/Button";

export default function PointSelection() {
  return (
    <section>
      <h2 className="font-bold text-lg mb-3">포인트 사용</h2>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-500">보유 포인트</span>
        <span className="font-semibold text-main">1000P</span>
      </div>
      <div className="flex gap-2">
        <input type="text" className="border rounded px-2 py-1 w-24" />
        <Button variant="outline" color="main" size="sm">
          전액 사용
        </Button>
      </div>
    </section>
  );
}
