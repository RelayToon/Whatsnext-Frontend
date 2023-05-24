import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { cls } from "@/utils/tailwindCss";
import { Proposal } from "@/types";
import nearStore from "@/store/nearStore";
import { VoteCreateModal, VoteModal } from "@/components/Modal";
import { ProposalCard } from "@/components/Vote/ProposalCard";

const VOTE_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_VOTE_CONTRACT_NAME;
const VOTE_PROPOSAL_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_VOTE_CONTRACT_SUB_VOTE_NAME;

const ComicVote = () => {
  const { wallet, isWalletStarted } = nearStore();
  const [voteProposalAddress] = useState<string>(
    VOTE_PROPOSAL_CONTRACT_ADDRESS as string
  );
  const [isOpenVoteCreateModal, setIsOpenVoteCreateModal] =
    useState<boolean>(false);
  const [isOpenVoteModal, setIsOpenVoteModal] = useState<boolean>(false);
  const [proposals, setProposals] = useState<any[]>([]);
  const [proposal, setProposal] = useState<Proposal | null>(null);

  const { ftBalance } = nearStore();
  const router = useRouter();
  const comicId = router.query.id;

  const isBlurBackground = useMemo(
    () => isOpenVoteCreateModal || isOpenVoteModal,
    [isOpenVoteCreateModal, isOpenVoteModal]
  );

  const initVote = useCallback(async () => {
    if (!isWalletStarted) return;

    try {
      const isVoting = await wallet.getIsVoting(VOTE_CONTRACT_ADDRESS, comicId);

      /**
       * @TODO 커뮤니티별로 투표 컨트랙트가 추가되면 투표 컨트랙트 주소 get 로직이 추가되야함.
       *
       * example)
       * const voteProposalAddress = await wallet.viewMethod({
       *   contractId: VOTE_CONTRACT_ADDRESS,
       *   method: "get_vote_account_id",
       *   args: {
       *     community_id: comicId,
       *   },
       * });
       *
       * setVoteProposalAddress(voteProposalAddress);
       */

      if (isVoting) {
        const allProposals = await wallet.getAllProposals(
          VOTE_PROPOSAL_CONTRACT_ADDRESS
        );

        setProposals(allProposals);
        return;
      }

      await wallet.startVote(VOTE_PROPOSAL_CONTRACT_ADDRESS, "1", comicId);
    } catch (e) {
      console.error(e);
    }
  }, [comicId, isWalletStarted, wallet]);

  const handleOpenVoteModal = useCallback((proposal: Proposal) => {
    setProposal(proposal);
    setIsOpenVoteModal(true);
  }, []);

  const voteCreateCallback = useCallback(async () => {
    const allProposals = await wallet.getAllProposals(
      VOTE_PROPOSAL_CONTRACT_ADDRESS
    );

    setProposals(allProposals);
  }, [wallet]);

  useEffect(() => {
    initVote();
  }, [initVote]);

  useEffect(() => {
    if (!isOpenVoteModal) {
      setProposal(null);
    }
  }, [isOpenVoteModal]);

  return (
    <>
      <div
        className={cls(
          "min-h-screen bg-black text-white",
          isBlurBackground ? "blur-sm" : ""
        )}
      >
        <div className="flex justify-between items-center px-6 h-16 bg-darkGray">
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

        <div className="h-full">
          <div className="px-5">
            <div className="flex justify-between font-bold my-2.5 px-4 py-2.5 bg-darkGray rounded-lg">
              <p>My Token</p>
              <div className="flex gap-2.5">
                <Image
                  src="/svgs/next-token.svg"
                  width={20}
                  height={20}
                  alt="next token"
                />
                <p>{ftBalance ?? 0} Next</p>
              </div>
            </div>
          </div>
          <div className="min-h-[calc(100vh-238px)] max-h-[calc(100vh-238px)] overflow-scroll px-5 mt-6 pb-6">
            <div className="flex flex-col gap-2.5">
              {proposals.map(([id, { title, prompt, description }]) => (
                <ProposalCard
                  key={comicId + id}
                  proposal={{ id, title, prompt, description }}
                  handleVote={handleOpenVoteModal}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex px-5 py-2.5 h-24 bg-darkGray">
          <button
            type="button"
            onClick={() => setIsOpenVoteCreateModal(true)}
            className="flex justify-center items-center w-full rounded-xl bg-gradient-to-r from-[#C053A8] to-[#5733E4] font-bold text-lg h-14"
          >
            Go to write the next story
          </button>
        </div>
      </div>

      <VoteCreateModal
        voteProposalAddress={voteProposalAddress}
        isOpen={isOpenVoteCreateModal}
        afterCallback={voteCreateCallback}
        onClose={() => setIsOpenVoteCreateModal(false)}
      />

      <VoteModal
        voteProposalAddress={voteProposalAddress}
        proposal={proposal}
        isOpen={isOpenVoteModal}
        onClose={() => setIsOpenVoteModal(false)}
      />
    </>
  );
};

export default ComicVote;
