/* eslint-disable react/prop-types */



const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <button onClick={onClose} className="absolute top-4 right-4 text-lg">
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
