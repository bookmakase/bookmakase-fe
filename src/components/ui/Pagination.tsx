type renderPageNumbersProps = {
  currentPage: number;
  totalPages: number;
  clickPage: (index: number) => void;
  prevPage: () => void;
  nextPage: () => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  clickPage,
  prevPage,
  nextPage,
}: renderPageNumbersProps) {
  // 페이지네이션 숫자 버튼 렌더링
  const renderPageNumbers = () => {
    const pageNumbers = [];

    // 페이지의 시작과 끝에서는 3개씩, 가운데에서는 5개씩 보임
    const startPage = Math.max(0, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => clickPage(i)}
          className={`px-3 py-1 rounded ${
            currentPage === i
              ? "bg-main text-white"
              : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
        onClick={prevPage}
      >
        이전
      </button>
      {renderPageNumbers()}
      <button
        className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
        onClick={nextPage}
      >
        다음
      </button>
    </div>
  );
}
