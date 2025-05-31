type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-700 opacity-95 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute text-4xl text-red-600 top-2 right-4  hover:text-red-800"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
