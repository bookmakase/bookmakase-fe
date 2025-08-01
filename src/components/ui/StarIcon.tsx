export default function StarIcon({
  fillPercentage,
  className = "w-6 h-6",
}: {
  fillPercentage: number;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* 빈 별 (회색) */}
      <svg
        className="absolute top-0 left-0 w-full h-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.642 7.375 8.113 1.18c.67.097.942.915.459 1.408l-5.88 5.734 1.39 8.077c.118.687-.594 1.217-1.21.87L12 18.271l-7.29 3.834c-.616.347-1.328-.183-1.21-.87l1.39-8.077-5.88-5.734c-.483-.493-.211-1.311.459-1.408l8.113-1.18L12 .587z" />
      </svg>

      {/* 채워진 별 (노란색) - 왼쪽 절반만 색칠 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <svg
          className="w-full h-full text-yellow-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <defs>
            <clipPath id={`star-clip-${fillPercentage}`}>
              <rect x="0" y="0" width={`${fillPercentage}%`} height="100%" />
            </clipPath>
          </defs>
          <path
            d="M12 .587l3.642 7.375 8.113 1.18c.67.097.942.915.459 1.408l-5.88 5.734 1.39 8.077c.118.687-.594 1.217-1.21.87L12 18.271l-7.29 3.834c-.616.347-1.328-.183-1.21-.87l1.39-8.077-5.88-5.734c-.483-.493-.211-1.311.459-1.408l8.113-1.18L12 .587z"
            clipPath={`url(#star-clip-${fillPercentage})`}
          />
        </svg>
      </div>
    </div>
  );
}
