import Image from "next/image";

interface BookTitleAndIntroProps {
  title: string;
  contents: string;
  thumbnail: string;
}

export default function BookTitleAndIntro({
  title,
  contents,
  thumbnail,
}: BookTitleAndIntroProps) {
  return (
    <div className="space-y-4 flex flex-col items-center text-center">
      <h1 className="font-bookk-bold text-xl leading-tight max-w-md">
        {title}
      </h1>
      <p className="text-sm leading-relaxed max-w-md">
        {contents.split(".")[0]}.
      </p>
      <Image
        src={thumbnail}
        alt={title}
        width={0}
        height={0}
        sizes="(max-width: 768px) 120px, (max-width: 1024px) 160px, 200px"
        className="w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-56 lg:w-48 lg:h-72 rounded-lg shadow-sm"
      />
    </div>
  );
}
