import { useEffect, useMemo, useState } from "react";

import Modal, { ModalProps } from ".";
import { cls } from "@/utils/tailwindCss";

const VoteCreateModal = ({ isOpen, onClose }: ModalProps) => {
  const [topic, setTopic] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const disabled = useMemo(() => {
    return !topic.length || !keyword.length || !description.length;
  }, [topic, keyword, description]);

  useEffect(() => {
    return () => {
      setTopic("");
      setKeyword("");
      setDescription("");
    };
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-4">
        <div className="bg-black rounded-lg">
          <div className="p-4 mb-4">
            <input
              type="text"
              className="w-full bg-black font-bold text-xl border-b border-white/50 py-2"
              onChange={(e) => setTopic(e.currentTarget.value)}
              placeholder="Topic"
            />
            <input
              type="text"
              className="w-full bg-black text-sm font-medium rounded-lg border border-white/50 px-5 py-2.5 mt-5 mb-3"
              onChange={(e) => setKeyword(e.currentTarget.value)}
              placeholder="keyword"
            />
            <input
              type="text"
              className="w-full bg-black font-medium rounded-lg border border-white/50 p-5"
              onChange={(e) => setDescription(e.currentTarget.value)}
              placeholder="description"
            />
          </div>
          <button
            className={cls(
              "w-full py-4 text-lg font-bold rounded-b-lg",
              disabled
                ? "bg-disabled"
                : "bg-gradient-to-r from-[#C053A8] to-[#5733E4]"
            )}
            disabled={disabled}
          >
            Write the next story
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default VoteCreateModal;
