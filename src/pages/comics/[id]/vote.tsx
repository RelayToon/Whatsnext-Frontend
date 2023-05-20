import { useRouter } from 'next/router';

const ComicVote = () => {
  const router = useRouter();
  const comicId = router.query.id;

  return <div>vote {comicId}</div>;
};

export default ComicVote;
