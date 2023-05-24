import { useRef } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = (e: any) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <>
      {isOpen ? (
        <div
          ref={modalRef}
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-gray/10"
          onClick={handleClose}
        >
          {children}
        </div>
      ) : null}
    </>
  );
};

export default Modal;
