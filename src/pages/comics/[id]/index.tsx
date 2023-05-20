import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { dummyComic } from '@/data';

const Comic = () => {
  const router = useRouter();
  const comicId = router.query.id;
  const comic = dummyComic.find(({ id }) => id === comicId);

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="p-2.5">
        <p className="text-right text-sm">@{comic?.author}</p>
        <div className="w-full h-min mt-2.5 mb-5">
          <Image src={comic?.image || ''} width={1080} height={1080} alt={comic?.title + '-image'} />
        </div>
        <p className="text-xs font-medium opacity-80">{comic?.keyword}</p>
        <p className="font-medium">{comic?.description}</p>
      </div>

      <div className="fixed flex flex-col justify-between top-0 w-full h-screen">
        <div className="flex justify-between items-center px-6 h-16 bg-darkGray">
          <button
            type="button"
            onClick={() => {
              router.back();
            }}
          >
            <Image src="/svgs/arrow-left.svg" width={14} height={14} alt="arrow left" />
          </button>
          <div className="flex flex-col gap-0.5 text-center">
            <p className="font-bold">{comic?.title}</p>
            <p className="text-sm">@{comic?.author}</p>
          </div>
          <div className="w-3.5" />
        </div>

        <div className="flex itemx-start justify-between bg-darkGray p-4 pb-5 h-24">
          <div className="flex gap-5 h-8">
            <button className="flex items-center gap-1.5">
              <Image src="/svgs/heart.svg" width={20} height={18} alt="heart" />
              <p className="text-sm">991</p>
            </button>
            <button className="flex items-center gap-1.5" onClick={() => router.push(`/comics/${comicId}/comment`)}>
              <Image src="/svgs/talk.svg" width={18} height={18} alt="talk" />
              <p className="text-sm">320</p>
            </button>
          </div>
          <Link href={`/comics/${comic?.id}/vote`} className="rounded border border-lightGray text-sm px-5 py-2">
            go vote
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Comic;
