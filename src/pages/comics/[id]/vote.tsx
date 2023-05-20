import { useRouter } from 'next/router';

const ComicVote = () => {
  const router = useRouter();
  const comicId = router.query.id;

  return (
    <div>
      <div>vote {comicId}</div>
      <div></div>
    </div>
  );
};

export default ComicVote;
