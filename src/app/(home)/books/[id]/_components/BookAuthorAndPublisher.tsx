interface BookAuthorAndPublisherProps {
  authors: string[];
  publisher: string;
}

export default function BookAuthorAndPublisher({
  authors,
  publisher,
}: BookAuthorAndPublisherProps) {
  return (
    <div>
      <p>
        <span className="font-bookk-bold">저자: </span>
        <span>{authors.join(", ")}</span>
      </p>
      <p>
        <span className="font-bookk-bold">출판사: </span>
        <span>{publisher}</span>
      </p>
    </div>
  );
}
