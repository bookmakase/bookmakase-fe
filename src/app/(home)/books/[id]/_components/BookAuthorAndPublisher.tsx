interface BookAuthorAndPublisherProps {
  authors: string[] | null;
  publisher: string | null;
}

export default function BookAuthorAndPublisher({
  authors,
  publisher,
}: BookAuthorAndPublisherProps) {
  return (
    <div className="space-y-2 text-sm">
      {authors && (
        <p className="flex items-center gap-2">
          <span className="font-bookk-bold">저자:</span>
          <span>{authors.join(", ")}</span>
        </p>
      )}
      {publisher && (
        <p className="flex items-center gap-2">
          <span className="font-bookk-bold">출판사:</span>
          <span>{publisher}</span>
        </p>
      )}
    </div>
  );
}
