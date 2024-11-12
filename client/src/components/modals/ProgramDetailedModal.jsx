/* eslint-disable react/prop-types */

const ProgramDetailedModal = ({ program, onClose }) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black dark:bg-opacity-80 bg-opacity-50">
      <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 max-w-md w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <h3 className="text-2xl mb-9 font-bold  mt-4 ">{program.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mt-2 overflow-y-auto scrollbar-custom rounded-lg p-3 dark:border dark:border-neutral-800 max-h-60 shadow-[inset_0px_0px_13px_0px_#00000024]">
          {program.description}
        </p>

        <p className="text-gray-700 dark:text-gray-300 mt-6">
          Price: Rs {program.price.toFixed(2)}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Members: {program.members.length}
        </p>
      </div>
    </div>
  );
};

export default ProgramDetailedModal;
