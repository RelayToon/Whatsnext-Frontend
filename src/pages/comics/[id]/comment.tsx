import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { dummyComic } from '@/data';

const ComicComment = () => {
  const router = useRouter();
  const comicId = router.query.id;

  const comic = dummyComic.find(({ id }) => id === comicId);

  // + createdAt
  const dummyComment = [
    {
      id: 1,
      roundId: 1,
      proposalId: 1,
      userAddress: '0x123',
      content: '1번 댓글',
      like: 5,
    },
    {
      id: 2,
      roundId: 1,
      proposalId: 1,
      userAddress: '0x123',
      content: '2번 댓글',
      like: 4,
    },
    {
      id: 3,
      roundId: 1,
      proposalId: 1,
      userAddress: '0x123',
      content: '3번 댓글',
      like: 3,
    },
    {
      id: 4,
      roundId: 1,
      proposalId: 1,
      userAddress: '0x123',
      content: '4번 댓글',
      like: 2,
    },
    {
      id: 5,
      roundId: 1,
      proposalId: 1,
      userAddress: '0x123',
      content: '2-1번 댓글',
      like: 5,
    },
    {
      id: 6,
      roundId: 1,
      proposalId: 1,
      userAddress: '0x123',
      content: '2-2번 댓글',
      like: 6,
    },
    {
      id: 7,
      roundId: 1,
      proposalId: 1,
      userAddress: '0x123',
      content: '1-1번 댓글',
      like: 9,
    },
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="flex justify-between items-center px-6 h-16 bg-darkGray">
        <button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          <Image src="/svgs/arrow-left.svg" width={14} height={14} alt="arrow left" />
        </button>
        <div className="mr-24" style={{ flexDirection: 'row' }}>
          <span className="font-bold text-xl mr-4" style={{ color: 'white' }}>
            Comment
          </span>
          {/* 👇 클릭 했을 때 state 변경 */}
          <span className="font-bold text-xl mr-4" style={{ color: 'gray' }}>
            Vote
          </span>
        </div>
        <div className="w-3.5" />
      </div>
      {dummyComment.map(comment => (
        <div className="border-b-2 border-white bg-lightGray text-white" key={comment.id}>
          asdflksadfjk;alsk
          <div>asdfsadfsd</div>
        </div>
      ))}
    </div>
  );
};

export default ComicComment;
