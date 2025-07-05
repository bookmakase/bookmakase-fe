interface BookAuthorAndPublisherProps {
  authors: string[];
  publisher: string;
}

export default function BookAuthorAndPublisher({
  authors,
  publisher,
}: BookAuthorAndPublisherProps) {
  return (
    <div className="space-y-2 text-sm">
      <p className="flex items-center gap-2">
        <span className="font-bookk-bold">저자:</span>
        <span>{authors.join(", ")}</span>
      </p>
      <p className="flex items-center gap-2">
        <span className="font-bookk-bold">출판사:</span>
        <span>{publisher}</span>
      </p>
    </div>
  );
}
