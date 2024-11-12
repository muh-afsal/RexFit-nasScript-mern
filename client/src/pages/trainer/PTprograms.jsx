/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { CLIENT_API } from "../../redux/actions/authActions";
import ProgramDetailedModal from "../../components/modals/ProgramDetailedModal";
import AddProgramModal from "../../components/modals/AddProgramModal";

const PTprograms = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // For Add Program Modal

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const fetchPrograms = async () => {
    try {
      const response = await CLIENT_API.get("/trainer/programs");
      if (Array.isArray(response.data)) {
        setPrograms(response.data);
      } else {
        setError("Error: Data is not an array.");
      }
    } catch (error) {
      setError("Error fetching programs data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleAllowDisallow = async (programId, currentStatus) => {
    try {
      const response = await CLIENT_API.post("/trainer/allowDisallowProgram", {
        id: programId,
        isDisabled: !currentStatus,
      });

      if (response.status === 200) {
        setPrograms((prevPrograms) =>
          prevPrograms.map((program) =>
            program._id === programId
              ? { ...program, isDisabled: !currentStatus }
              : program
          )
        );
      }
    } catch (err) {
      setError("Error updating program status");
    }
  };

  const handleProgramAdded = () => {
    fetchPrograms();
    handleCloseModal();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-9">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-2xl font-bold mb-4">Manage Programs</h4>
        <button
          onClick={handleOpenModal}
          className="dark:bg-rex-green bg-rex-green-light text-black px-4 py-2 rounded-md hover:bg-rex-green-light"
        >
          Add Program
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto rounded-lg border border-gray-300 dark:bg-neutral-900 bg-neutral-200 overflow-hidden">
          <thead>
            <tr className="bg-gray-100 dark:bg-neutral-800 text-left ">
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300 rounded-tl-lg">
                No.
              </th>
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300">
                Title
              </th>
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300">
                Description
              </th>
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300">
                Price
              </th>
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300">
                Members
              </th>
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300">
                Status
              </th>
              <th className="px-4 py-2 font-semibold text-sm text-neutral-600 dark:text-neutral-300 rounded-tr-lg">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program, index) => (
              <tr
                key={program._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } mb-4 h-16 rounded-lg border-b dark:border-neutral-700 dark:bg-neutral-900 bg-neutral-200`}
                onClick={() => setSelectedProgram(program)}
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{program.title}</td>
                <td className="px-4 py-2">
                  {program.description.split(" ").slice(0, 3).join(" ")}
                  {program.description.split(" ").length > 3 && "..."}
                </td>
                <td className="px-4 py-2">Rs {program.price.toFixed(2)}</td>
                <td className="px-4 py-2">{program.members.length}</td>
                <td className="px-4 py-2">
                  {program.isDisabled ? "Disabled" : "Enabled"}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="text-secondary dark:bg-neutral-800 bg-neutral-300 rounded-lg px-3 py-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAllowDisallow(program._id, program.isDisabled);
                    }}
                  >
                    {program.isDisabled ? "Enable" : "Disable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProgram && (
        <ProgramDetailedModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}

      <AddProgramModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onProgramAdded={handleProgramAdded}
      />
    </div>
  );
};

export default PTprograms;
