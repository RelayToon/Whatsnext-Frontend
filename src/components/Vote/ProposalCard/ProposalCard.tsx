import { useState } from "react";
import Image from "next/image";

import { cls } from "@/utils/tailwindCss";
import { Proposal } from "@/types";

interface ProposalCardProps {
  proposal: Proposal;
  handleVote: (proposal: Proposal) => void;
}

const ProposalCard = ({ proposal, handleVote }: ProposalCardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      key={proposal.id}
      className="flex flex-col px-6 py-5 bg-darkGray rounded-lg"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="flex justify-between items-start">
        <p
          className={cls(
            "font-bold text-xl w-min-content pr-6",
            isOpen ? "whitespace-pre-wrap" : "text-ellipsis line-clamp-1"
          )}
        >
          {proposal.title}
        </p>
        <div className="w-6 pt-1">
          <Image
            src="/svgs/arrow-right.svg"
            width={12}
            height={8}
            alt="into proposal"
            className={cls("transition", isOpen ? "-rotate-90" : "rotate-90")}
          />
        </div>
      </div>
      <p
        className={cls(
          "text-sm opacity-80",
          isOpen
            ? "mt-5 whitespace-pre-wrap"
            : "mt-2.5 text-ellipsis line-clamp-1"
        )}
      >
        {proposal.prompt}
      </p>
      <div
        className={cls(
          "font-medium w-min-content",
          isOpen ? "mt-2 whitespace-pre-wrap" : "text-ellipsis line-clamp-1"
        )}
      >
        {proposal.description}
      </div>
      <div className={cls("flex justify-between", isOpen ? "pt-6" : "pt-3")}>
        <div className="flex">
          <div className="flex mr-3">
            <Image
              src="/svgs/diamond.svg"
              width={20}
              height={20}
              alt="into proposal"
              className="mr-2"
              onClick={() => handleVote(proposal)}
            />
            {/* total vote */}
            <span>0</span>
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
            <span>0</span>
          </div>
        </div>
        {/* writer */}
        <p>@anonymous</p>
      </div>
    </div>
  );
};

export default ProposalCard;
