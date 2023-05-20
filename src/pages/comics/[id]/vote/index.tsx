import { dummyComic } from '@/data';
import nearStore from '@/store/nearStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ComicVote = () => {
  const dummyProposal = [
    {
      title: '1번 제안',
      prompt: 'bla, blabla, abcd, apple, banana, ai',
      description:
        '1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 1번 제안 설명 ',
      totalVote: 255235,
      comment: 1234,
      writer: 'dohoon.near',
    },
    {
      title: '2번 제안',
      prompt: 'bla, blabla, abcd, apple, banana, ai',
      description:
        '2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명2번 제안 설명 ',
      totalVote: 12522,
      comment: 1234,
      writer: 'dohoon.near',
    },
    {
      title: '3번 제안',
      prompt: 'bla, blabla, abcd, apple, banana, ai',
      description: '3번 제안 설명 ',
      totalVote: 234356,
      comment: 1234,
      writer: 'dohoon.near',
    },
    {
      title: '4번 제안',
      prompt: 'bla, blabla, abcd, apple, banana, ai',
      description: '4번 제안 설명 ',
      totalVote: 2324,
      comment: 1234,
      writer: 'dohoon.near',
    },
    {
      title: '5번 제안',
      prompt: 'bla, blabla, abcd, apple, banana, ai',
      description: '5번 제안 설명 ',
      totalVote: 2415,
      comment: 1234,
      writer: 'dohoon.near',
    },
    {
      title: '5번 제안',
      prompt: 'bla, blabla, abcd, apple, banana, ai',
      description: '5번 제안 설명',
      totalVote: 1111,
      comment: 1234,
      writer: 'dohoon.near',
    },
  ];
  //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  const { ftBalance } = nearStore();
  const router = useRouter();
  const comicId = router.query.id;
  const comic = dummyComic.find(({ id }) => id === comicId);

  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      setSelectedProposal(null);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex justify-between items-center px-6 h-16 bg-darkGray">
        <button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          <Image src="/svgs/arrow-left.svg" width={14} height={14} alt="arrow left" />
        </button>
        <p className="font-bold text-xl">Vote</p>
        <button>
          <Image src="/svgs/setting-detail.svg" width={18} height={22} alt="setting detail" />
        </button>
      </div>

      <div className="h-full px-5">
        <div className="flex justify-between font-bold my-2.5 px-4 py-2.5 bg-darkGray rounded-lg">
          <p>My Token</p>
          <div className="flex gap-2.5">
            <Image src="/svgs/next-token.svg" width={20} height={20} alt="next token" />
            <p>{ftBalance} Next</p>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 min-h-[calc(100vh-224px)] overflow-scroll ">
          {dummyProposal.map((proposal, index) => (
            <div
              key={index}
              className={`flex flex-col gap-2 px-4 py-2.5 bg-darkGray rounded-lg ${
                selectedProposal === index ? 'h-auto' : ''
              }`}
              onClick={() => setSelectedProposal(selectedProposal === index ? null : index)}
            >
              {' '}
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg">{proposal.title}</p>
                <div>
                  <Image
                    src="/svgs/arrow-right.svg"
                    width={12}
                    height={12}
                    alt="into proposal"
                    className={`${selectedProposal === index ? '-rotate-90' : 'rotate-90'}`}
                  />
                </div>
              </div>
              <p className="text-sm" style={{ color: 'lightgray' }}>
                {proposal.prompt}
              </p>
              <div
                className={`text-sm ${selectedProposal === index ? ' h-auto overflow-y-auto' : 'h-12 overflow-hidden'}`}
                style={{ color: 'lightgray' }}
              >
                {proposal.description}
              </div>
              <div className="flex justify-between">
                <div className="flex">
                  <div className="flex mr-3">
                    <Image src="/svgs/picture.svg" width={20} height={20} alt="into proposal" className="mr-2" />
                    <div>{proposal.totalVote}</div>
                  </div>
                  <div className="flex">
                    <Image src="/svgs/talk.svg" width={20} height={20} alt="into proposal" className="mr-2" />
                    <div>{proposal.comment}</div>
                  </div>
                </div>
                <div>{proposal.writer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex px-5 py-2.5 h-24 bg-darkGray mt-3  ">
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
