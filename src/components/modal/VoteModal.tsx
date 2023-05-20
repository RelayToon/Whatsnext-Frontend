import { useEffect, useMemo, useState } from 'react';

import Modal, { ModalProps } from '.';
import { cls } from '@/utils/tailwindCss';
import Image from 'next/image';
import { dummyProposal } from '@/data';

const VoteModal = ({ isOpen, onClose }: ModalProps) => {
  const [topic, setTopic] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [voteCount, setVoteCount] = useState<number>(0);
  const [selected, setSelected] = useState<boolean>(false);

  const incrementVote = () => {
    setVoteCount(voteCount + 1);
  };

  const decrementVote = () => {
    setVoteCount(voteCount - 1);
  };

  const disabled = useMemo(() => {
    return !topic.length || !keyword.length || !description.length;
  }, [topic, keyword, description]);

  useEffect(() => {
    return () => {
      setTopic('');
      setKeyword('');
      setDescription('');
    };
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-4">
        <div className="bg-black rounded-lg" style={{ width: '22rem' }}>
          <div className="p-4 text-white" onClick={() => setSelected(selected === true ? false : true)}>
            <div className="flex">
              <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-2xl">
                1111111111111111111111111111111111111111111111111111111111111111111111111111111111111
              </div>
              <Image
                src="/svgs/arrow-right.svg"
                width={12}
                height={12}
                alt="into proposal"
                className={` ml-8 mr-2 ${selected === true ? '-rotate-90' : 'rotate-90'}`}
              />
            </div>
            <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-gray text-sm">
              22222222222222222
            </div>
            <div
              className={` text-md ${
                selected === true
                  ? ' max-h-64 overflow-y-auto h-auto overflow-y-auto'
                  : 'overflow-hidden overflow-ellipsis whitespace-nowrap h-12 overflow-hidden'
              }  `}
            >
              내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
            </div>
          </div>
          <div className="flex h-full text-white justify-between px-4 mb-4 ">
            <div className="flex">
              <button
                onClick={decrementVote}
                className="h-10 w-10 rounded-bl-md rounded-tl-md"
                style={{ backgroundColor: 'gray' }}
              >
                -
              </button>
              <div
                className="h-10 w-14 flex justify-center items-center h-full "
                style={{ backgroundColor: '#323232' }}
              >
                {voteCount}
              </div>
              <button
                onClick={incrementVote}
                className="h-10 w-10 rounded-br-md rounded-tr-md"
                style={{ backgroundColor: 'gray' }}
              >
                +
              </button>
            </div>
            <div className="text-white text-2xl ">5 Next</div>
          </div>
          <div className="flex text-white">
            <button
              className={cls(
                'w-full py-4 text-lg font-bold rounded-bl-lg',
                disabled ? 'bg-disabled' : 'bg-gradient-to-r from-[#C053A8] to-[#5733E4]'
              )}
              disabled={disabled}
            >
              cancel
            </button>
            <button
              style={{ backgroundColor: '#C746DB' }}
              className={cls(
                'w-full py-4 text-lg font-bold rounded-br-lg',
                disabled ? 'bg-disabled' : 'bg-gradient-to-r from-[#C053A8] to-[#5733E4]'
              )}
              disabled={disabled}
            >
              vote the next story
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default VoteModal;
