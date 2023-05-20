import { dummyComic } from "@/data";
import nearStore from "@/store/nearStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const ComicVote = () => {
  const { ftBalance } = nearStore();
  const router = useRouter();
  const comicId = router.query.id;
  const comic = dummyComic.find(({ id }) => id === comicId);

  return (
    <div className="min-h-screen max-h-screen">
      <div className="flex justify-between items-center px-6 h-16 bg-darkGray">
        <button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          <Image
            src="/svgs/arrow-left.svg"
            width={14}
            height={14}
            alt="arrow left"
          />
        </button>
        <p className="font-bold text-xl">Vote</p>
        <button>
          <Image
            src="/svgs/setting-detail.svg"
            width={18}
            height={22}
            alt="setting detail"
          />
        </button>
      </div>

      <div className="h-full px-5">
        <div className="flex justify-between font-bold my-2.5 px-4 py-2.5 bg-darkGray rounded-lg">
          <p>My Token</p>
          <div className="flex gap-2.5">
            <Image
              src="/svgs/next-token.svg"
              width={20}
              height={20}
              alt="next token"
            />
            <p>{ftBalance} Next</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 min-h-[calc(100vh-224px)] overflow-scroll"></div>
      </div>

      <div className="flex px-5 py-2.5 h-24 bg-darkGray">
        <Link
          href={`/comics/${comicId}/vote/new`}
          className="flex justify-center items-center w-full rounded-xl bg-gradient-to-r from-[#C053A8] to-[#5733E4] font-bold text-lg h-14"
        >
          Go to write the next story
        </Link>
      </div>
    </div>
  );
};

export default ComicVote;
