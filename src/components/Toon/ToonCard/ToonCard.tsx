import Image from "next/image";

interface ToonCardProps {
  title: string;
  thumbnail: string;
  episode: string | number;
  description: string;
}

const ToonCard = ({
  title,
  thumbnail,
  episode,
  description,
}: ToonCardProps) => {
  return (
    <div key={title} className="flex gap-2.5 p-2.5 pr-5 bg-darkGray rounded-lg">
      <Image
        src={thumbnail}
        className="rounded-lg"
        width={60}
        height={60}
        alt={title + "-thumbnail"}
      />
      <div className="w-full flex flex-col justify-center gap-1">
        <div className="flex justify-between">
          <p className="font-bold text-lg pr-4 overflow-hidden truncate">
            {title}
          </p>
          <p className="text-sm">p.{episode}</p>
        </div>

        <p className="text-sm font-medium">{description}</p>
      </div>
    </div>
  );
};

export default ToonCard;
