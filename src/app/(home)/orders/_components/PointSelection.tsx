"use client";

import { ChangeEvent, useState } from "react";
import Button from "@/components/ui/Button";
import { useOrderStore } from "@/store/useOrderStore";

export default function PointSelection({ point }: { point: number }) {
  // 변수
  const [inputUsedPoint, setInputUsedPoint] = useState<string>("");

  // store
  const { setUsedPoint } = useOrderStore();

  // 메서드
  const useAllPoint = () => {
    setUsedPoint(point); // 보유 포인트 전체를 스토어에 저장
    setInputUsedPoint(String(point)); // 입력 필드도 전액으로 업데이트
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 입력 허용 및 음수 방지
    if (/^\d*$/.test(value)) {
      // 숫자인 문자열만 허용 (빈 문자열 포함)
      setInputUsedPoint(value);
    }
  };

  const inputBlur = () => {
    let pointToUse = Number(inputUsedPoint);

    // 유효성 검사 및 포인트 제한 로직
    if (isNaN(pointToUse) || pointToUse < 0) {
      pointToUse = 0; // 숫자가 아니거나 음수면 0으로 처리
    } else if (pointToUse > point) {
      pointToUse = point; // 보유 포인트보다 많으면 보유 포인트까지만 사용
    }

    // 스토어에 사용 포인트 업데이트
    setUsedPoint(pointToUse);
    // UI 입력 필드도 스토어에 저장된 실제 사용 포인트 값으로 동기화 (선택 사항)
    setInputUsedPoint(String(pointToUse));
  };

  return (
    <section>
      <h2 className="font-bold text-lg mb-3">포인트 사용</h2>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-500">보유 포인트</span>
        <span className="font-semibold text-main">
          {point.toLocaleString()}P
        </span>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="border rounded px-2 py-1 w-36"
          placeholder="사용할 포인트"
          value={inputUsedPoint}
          onChange={inputChange}
          onBlur={inputBlur}
        />
        <Button variant="outline" color="main" size="sm" onClick={useAllPoint}>
          전액 사용
        </Button>
      </div>
    </section>
  );
}
