import { useEffect, useMemo, useState } from "react";

import Modal, { ModalProps } from ".";
import { cls } from "@/utils/tailwindCss";
import Image from "next/image";
import nearStore from "@/store/nearStore";

interface VoteModalProps extends ModalProps {
  title: string;
  prompt: string;
  description: string;
}

const VoteModal = ({
  title,
  prompt,
  description,
  isOpen,
  onClose,
}: VoteModalProps) => {
  const { wallet, ftBalance } = nearStore();
  const [voteCount, setVoteCount] = useState<number>(0);
  const [selected, setSelected] = useState<boolean>(false);

  const incrementVote = () => {
    if (ftBalance === voteCount) return;
    setVoteCount(voteCount + 1);
  };

  const decrementVote = () => {
    if (!voteCount) return;
    setVoteCount(voteCount - 1);
  };

  useEffect(() => {
    return () => {
      setVoteCount(0);
      setSelected(false);
    };
  }, []);

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
                {title}
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
              {prompt}
            </div>
            <div
              className={cls(
                "text-md font-bold text-lg",
                selected
                  ? "max-h-64 overflow-y-auto h-auto"
                  : "overflow-hidden overflow-ellipsis whitespace-nowrap h-12"
              )}
            >
              {description}
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
                {voteCount}
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
              className={cls(
                "w-full py-4 font-bold rounded-bl-lg bg-lightGray"
              )}
            >
              Cancel
            </button>
            <button
              className={cls("w-full py-4 font-bold rounded-br-lg bg-pink")}
              disabled={!voteCount}
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
