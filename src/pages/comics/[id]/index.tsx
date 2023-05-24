import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { cls } from "@/utils/tailwindCss";
import { getWalletAuthKey } from "@/utils/auth";
import { dummyComic, dummyComicCuts } from "@/data";
import nearStore from "@/store/nearStore";

const Comic = () => {
  const router = useRouter();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const { isWalletStarted, initFtBalance, clearFtBalance } = nearStore();

  const [currentEpisode, setCurrentEpisode] = useState<number>(0);
  const [isHideNav, setIsHideNav] = useState<boolean>(false);

  const comicId = router.query.id;
  const comic = dummyComic.find(({ id }) => id === comicId);
  const comicCuts = dummyComicCuts.find(
    ({ communityId }) => communityId === comic?.id
  )?.cuts;

  const currentCut = useMemo(() => {
    return comicCuts?.find(({ id }) => id === currentEpisode);
  }, [comicCuts, currentEpisode]);

  const handleNavHide = useCallback((e: any) => {
    if (e.target === backgroundRef.current) {
      setIsHideNav((prev) => !prev);
    }
  }, []);

  const initComic = useCallback(async () => {
    try {
      clearFtBalance();

      await initFtBalance(comicId as string);
    } catch (e) {
      console.error(e);
    }
  }, [comicId, initFtBalance, clearFtBalance]);

  useEffect(() => {
    if (isWalletStarted && getWalletAuthKey()) {
      initComic();
    }
  }, [isWalletStarted, initComic]);

  return (
    <main onClick={handleNavHide}>
      <div
        className="relative flex justify-center items-center min-h-screen"
        ref={backgroundRef}
      >
        <div className="p-2.5">
          <div className="w-full h-min mt-2.5 mb-5">
            <Image
              src={currentCut?.image || ""}
              width={1080}
              height={1080}
              alt={comic?.title + "-episode-" + currentCut?.id}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            const prevEpisode = currentEpisode - 1;
            if (prevEpisode < 0) return;

            setCurrentEpisode(prevEpisode);
          }}
          className="absolute flex items-center p-6 left-0 h-1/2 w-1/2"
        >
          <Image
            src="/svgs/arrow-left.svg"
            className={currentEpisode - 1 < 0 ? "hidden" : ""}
            width={8}
            height={16}
            alt="arrow left"
          />
        </button>
        <button
          type="button"
          onClick={() => {
            const nextEpisode = currentEpisode + 1;
            if (comicCuts && nextEpisode >= comicCuts?.length) {
              router.push(`${comicId}/vote`);
              return;
            }

            setCurrentEpisode(nextEpisode);
          }}
          className="absolute flex justify-end items-center p-6 right-0 h-1/2 w-1/2"
        >
          <Image
            src="/svgs/arrow-right.svg"
            className={
              comicCuts && currentEpisode + 1 >= comicCuts?.length
                ? "hidden"
                : ""
            }
            width={8}
            height={16}
            alt="arrow right"
          />
        </button>
      </div>

      <div
        className={cls(
          "fixed top-0 flex w-full justify-between items-center px-6 h-16 bg-darkGray",
          isHideNav ? "hidden" : ""
        )}
      >
        <button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          <Image
            src="/svgs/arrow-back.svg"
            width={14}
            height={14}
            alt="arrow left"
          />
        </button>
        <div className="flex flex-col gap-0.5 text-center">
          <p className="font-bold">{comic?.title}</p>
          <p className="text-sm">@{comic?.author}</p>
        </div>
        <div className="w-3.5" />
      </div>

      <div
        className={cls(
          "fixed bottom-0 flex w-full itemx-start justify-between bg-darkGray p-4 pb-5 h-24",
          isHideNav ? "hidden" : ""
        )}
      >
        <div className="flex gap-5 h-8">
          <button className="flex items-center gap-1.5">
            <Image src="/svgs/heart.svg" width={20} height={18} alt="heart" />
            <p className="text-sm">{currentCut?.like}</p>
          </button>
          <button
            className="flex items-center gap-1.5"
            onClick={() => router.push(`/comics/${comicId}/comment`)}
          >
            <Image src="/svgs/talk.svg" width={18} height={18} alt="talk" />
            <p className="text-sm">{currentCut?.comment}</p>
          </button>
        </div>
        <Link
          href={`/comics/${comic?.id}/vote`}
          className="flex items-center rounded border border-lightGray text-sm px-5 py-2 h-8"
        >
          Going to vote
        </Link>
      </div>
    </main>
  );
};

export default Comic;
