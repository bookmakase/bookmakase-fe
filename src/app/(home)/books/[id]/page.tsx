import { notFound } from "next/navigation";
import ReviewSection from "./_components/ReviewSection";
import BookAuthorAndPublisher from "./_components/BookAuthorAndPublisher";
import BookTitleAndIntro from "./_components/BookTitleAndIntro";
import StockAndPurchase from "./_components/StockAndPurchase";
import { fetchBookDetail } from "@/api/book";

interface BookDetailPageProps {
  params: { id: string };
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;

  // id 유효성 검사
  const bookId = parseInt(id, 10);
  if (isNaN(bookId) || bookId <= 0) {
    notFound();
  }

  const book = await fetchBookDetail(bookId);
  if (!book) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      {/* 상단 섹션: 6구역 분할 */}
      <div className="grid grid-cols-6 gap-4 justify-items-center items-center py-16">
        {/* 좌측 1영역 비움 */}
        <div className="col-span-1"></div>

        {/* BookAuthorAndPublisher: 1영역 차지 */}
        <div className="col-span-1 flex justify-center items-center">
          <BookAuthorAndPublisher
            authors={book.authors}
            publisher={book.publisher}
          />
        </div>

        {/* BookTitleAndIntro: 2영역 차지 */}
        <div className="col-span-2 flex justify-center items-center">
          <BookTitleAndIntro
            title={book.title}
            contents={book.contents}
            thumbnail={book.thumbnail}
          />
        </div>

        {/* StockAndPurchase: 1영역 차지 */}
        <div className="col-span-1 flex justify-center items-center">
          <StockAndPurchase
            bookId={book.bookId}
            price={book.price}
            salePrice={book.salePrice}
            status={book.status}
          />
        </div>

        {/* 우측 1영역 비움 */}
        <div className="col-span-1"></div>
      </div>
      <hr />

      {/* 하단 섹션: ReviewSection */}
      <div className="grid grid-cols-6 gap-4 justify-items-center items-center">
        {/* 좌측 1영역 비움 */}
        <div className="col-span-1"></div>

        {/* ReviewSection: 3영역 차지 */}
        <div className="col-span-3 flex justify-center items-center">
          <ReviewSection bookId={book.bookId} />
        </div>

        {/* 우측 2영역 비움 */}
        <div className="col-span-2"></div>
      </div>
    </div>
  );
}
