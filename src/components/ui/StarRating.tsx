import { useState, useEffect } from "react";
import StarIcon from "./StarIcon";

export default function StarRating({
  initialRating = 0,
  onChange,
  className = "",
  isReadOnly = false,
}: {
  initialRating: number;
  onChange?: (rating: number) => void;
  className?: string;
  isReadOnly?: boolean;
}) {
  // initialRating은 0~10 사이의 값 (반쪽 별 1점)
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(initialRating); // 현재 선택된 평점

  // initialRating이 변경될 때 currentRating 업데이트
  useEffect(() => {
    setCurrentRating(initialRating);
  }, [initialRating]);

  const handleStarClick = (index: number, isHalf: boolean) => {
    // index는 0부터 4까지의 별 인덱스
    // isHalf가 true면 반쪽 별, false면 온전한 별
    const newRating = index * 2 + (isHalf ? 1 : 2); // 0점(0)부터 10점(50)까지 계산
    setCurrentRating(newRating);
    if (onChange) {
      onChange(newRating); // 부모 컴포넌트로 변경된 평점 전달
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    // 마우스가 별 위로 움직일 때
    const starRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - starRect.left; // 별 요소 내에서의 x 좌표
    const newHoverRating = index * 2 + (x < starRect.width / 2 ? 1 : 2);
    setHoverRating(newHoverRating);
  };

  const displayRating = hoverRating > 0 ? hoverRating : currentRating; // 호버 중이면 호버 평점 표시, 아니면 현재 평점 표시

  return (
    <div className={`flex items-center space-x-0.5 ${className}`}>
      {/* 별들 간의 간격 조절 */}
      {[...Array(5)].map((_, index) => {
        // 별 5개 렌더링
        const starValue = index * 2; // 각 별의 시작 점수 (0, 2, 4, 6, 8)
        let fillPercentage = 0;

        if (displayRating > starValue) {
          fillPercentage = Math.min((displayRating - starValue) * 50, 100); // 1점 당 50% 채움
        }

        return (
          <div
            key={index}
            className={`relative ${
              isReadOnly ? "cursor-default" : "cursor-pointer"
            }`}
            onMouseMove={(e) =>
              isReadOnly ? undefined : handleMouseMove(e, index)
            }
            onMouseLeave={() => (isReadOnly ? undefined : setHoverRating(0))}
            onClick={(e) => {
              if (isReadOnly) return;
              const starRect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - starRect.left;
              handleStarClick(index, x < starRect.width / 2);
            }}
          >
            <StarIcon fillPercentage={fillPercentage} />
          </div>
        );
      })}
    </div>
  );
}
