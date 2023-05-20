import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

import nearStore from "@/store/nearStore";
import VoteCreateModal from "@/components/modal/VoteCreateModal";
import VoteModal from "@/components/modal/VoteModal";
import { cls } from "@/utils/tailwindCss";

const VOTE_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_VOTE_CONTRACT_NAME;
const VOTE_PROPOSAL_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_VOTE_CONTRACT_SUB_VOTE_NAME;

const ComicVote = () => {
  const { wallet, isWalletStarted } = nearStore();
  const [voteProposalAddress, setVoteProposalAddress] = useState<string>(
    VOTE_PROPOSAL_CONTRACT_ADDRESS as string
  );
  const [isOpenVoteCreateModal, setIsOpenVoteCreateModal] =
    useState<boolean>(false);
  const [isOpenVoteModal, setIsOpenVoteModal] = useState<boolean>(false);
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null);
  const [proposals, setProposals] = useState([]);
  const [topic, setTopic] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { ftBalance } = nearStore();
  const router = useRouter();
  const comicId = router.query.id;

  useEffect(() => {
    (async () => {
      if (!isWalletStarted) return;

      try {
        const isVoting = await wallet.viewMethod({
          contractId: VOTE_CONTRACT_ADDRESS,
          method: "is_voting",
          args: {
            community_id: comicId,
          },
        });

        // const voteProposalAddress = await wallet.viewMethod({
        //   contractId: VOTE_CONTRACT_ADDRESS,
        //   method: "get_vote_account_id",
        //   args: {
        //     community_id: comicId,
        //   },
        // });
        // setVoteProposalAddress(voteProposalAddress);

        if (isVoting) {
          const allProposals = await wallet.viewMethod({
            contractId: VOTE_PROPOSAL_CONTRACT_ADDRESS,
            method: "get_all_proposals",
          });
          setProposals(allProposals);
        } else {
          await wallet.callMethod({
            contractId: VOTE_PROPOSAL_CONTRACT_ADDRESS,
            method: "new_vote",
            args: {
              prefix: "1",
              community_id: comicId,
            },
          });
        }
      } catch (e) {
        console.error(e);
      }
    })();

    return () => {
      setSelectedProposal(null);
    };
  }, [comicId, isWalletStarted, wallet]);

  useEffect(() => {
    if (!isOpenVoteModal) {
      setTopic("");
      setKeyword("");
      setDescription("");
    }
  }, [isOpenVoteModal]);

  const handleOpenVoteModal = (
    title: string,
    prompt: string,
    description: string
  ) => {
    setTopic(title);
    setKeyword(prompt);
    setDescription(description);
    setIsOpenVoteModal(true);
  };

  return (
    <>
      <div
        className={cls(
          "min-h-screen bg-black text-white",
          isOpenVoteCreateModal || isOpenVoteModal ? "blur-sm" : ""
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
                <p>{ftBalance} Next</p>
              </div>
            </div>
          </div>
          <div className="min-h-[calc(100vh-236px)] max-h-[calc(100vh-236px)] overflow-scroll px-5 py-6">
            <div className="flex flex-col gap-2.5">
              {proposals.map(([id, { title, prompt, description }]) => (
                <div
                  key={id}
                  className={cls(
                    "flex flex-col px-4 py-2.5 bg-darkGray rounded-lg",
                    selectedProposal === id ? "h-auto" : ""
                  )}
                  onClick={() =>
                    setSelectedProposal(selectedProposal === id ? null : id)
                  }
                >
                  {" "}
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-lg">{title}</p>
                    <div>
                      <Image
                        src="/svgs/arrow-right.svg"
                        width={12}
                        height={12}
                        alt="into proposal"
                        className={`${
                          selectedProposal === id ? "-rotate-90" : "rotate-90"
                        }`}
                      />
                    </div>
                  </div>
                  <p className="text-sm mt-2" style={{ color: "lightgray" }}>
                    {prompt}
                  </p>
                  <div
                    className={cls(
                      "font-medium",
                      selectedProposal === id
                        ? "h-auto overflow-y-auto"
                        : "h-12 overflow-hidden"
                    )}
                    style={{ color: "" }}
                  >
                    {description}
                  </div>
                  <div className="flex justify-between pt-3">
                    <div className="flex">
                      <div className="flex mr-3">
                        <Image
                          src="/svgs/diamond.svg"
                          width={20}
                          height={20}
                          alt="into proposal"
                          className="mr-2"
                          onClick={() =>
                            handleOpenVoteModal(title, prompt, description)
                          }
                        />
                        {/* totalVote */}
                        <div>{0}</div>
                      </div>
                      <div className="flex">
                        <Image
                          src="/svgs/talk.svg"
                          width={20}
                          height={20}
                          alt="into proposal"
                          className="mr-2"
                        />
                        {/* comment */}
                        <div>{0}</div>
                      </div>
                    </div>
                    {/* writer */}
                    <div>@{"coke"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex px-5 py-2.5 h-24 bg-darkGray mt-3">
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
        onClose={() => setIsOpenVoteCreateModal(false)}
      />

      <VoteModal
        title={topic}
        prompt={keyword}
        description={description}
        isOpen={isOpenVoteModal}
        onClose={() => setIsOpenVoteModal(false)}
      />
    </>
  );
};

export default ComicVote;
