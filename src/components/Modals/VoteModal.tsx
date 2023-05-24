import { useEffect, useState } from "react";
import Image from "next/image";

import { cls } from "@/utils/tailwindCss";
import { Proposal } from "@/types";
import nearStore from "@/store/nearStore";
import Modal, { ModalProps } from "./Modal";

interface VoteModalProps extends ModalProps {
  voteProposalAddress: string;
  proposal: Proposal | null;
}

const VoteModal = ({
  voteProposalAddress,
  proposal,
  isOpen,
  onClose,
}: VoteModalProps) => {
  const { wallet, ftBalance, setFtBalance } = nearStore();
  const [voteAmount, setVoteAmount] = useState<number>(0);
  const [selected, setSelected] = useState<boolean>(false);

  const incrementVote = () => {
    if (ftBalance === voteAmount) return;
    setVoteAmount(voteAmount + 1);
  };

  const decrementVote = () => {
    if (!voteAmount) return;
    setVoteAmount(voteAmount - 1);
  };

  const handleVote = async () => {
    try {
      await wallet.callMethod({
        contractId: voteProposalAddress,
        method: "vote",
        args: {
          proposal: proposal?.id,
          amount: voteAmount,
        },
      });

      setFtBalance(ftBalance - voteAmount);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setVoteAmount(0);
      setSelected(false);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-4">
        <div className="bg-black rounded-xl" style={{ width: "22rem" }}>
          <div
            className="px-4 py-6 text-white"
            onClick={() => setSelected(selected === true ? false : true)}
          >
            <div className="flex justify-between mb-2">
              <div className="overflow-hidden overflow-ellipsis whitespace-nowrap font-bold text-2xl">
                {proposal?.title}
              </div>
              <Image
                src="/svgs/arrow-right.svg"
                width={12}
                height={12}
                alt="into proposal"
                className={` ml-8 mr-2 ${
                  selected === true ? "-rotate-90" : "rotate-90"
                }`}
              />
            </div>
            <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-gray text-sm">
              {proposal?.prompt}
            </div>
            <div
              className={cls(
                "text-md font-bold text-lg",
                selected
                  ? "max-h-64 overflow-y-auto h-auto"
                  : "overflow-hidden overflow-ellipsis whitespace-nowrap h-12"
              )}
            >
              {proposal?.description}
            </div>
          </div>
          <div className="flex h-full text-white justify-between px-4 mb-4">
            <div className="flex font-bold">
              <button
                onClick={decrementVote}
                className="h-10 w-10 rounded-bl-md rounded-tl-md"
                style={{ backgroundColor: "gray" }}
              >
                -
              </button>
              <div
                className="h-10 w-14 flex justify-center items-center"
                style={{ backgroundColor: "#323232" }}
              >
                {voteAmount}
              </div>
              <button
                onClick={incrementVote}
                className="h-10 w-10 rounded-br-md rounded-tr-md"
                style={{ backgroundColor: "gray" }}
              >
                +
              </button>
            </div>
            <div className="flex items-center text-white text-lg font-bold">
              {ftBalance} next
            </div>
          </div>
          <div className="flex text-white">
            <button
              type="button"
              onClick={onClose}
              className={cls(
                "w-full py-4 font-bold rounded-bl-lg bg-lightGray"
              )}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleVote}
              className={cls("w-full py-4 font-bold rounded-br-lg bg-pink")}
              disabled={!voteAmount}
            >
              Vote the next story
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default VoteModal;
