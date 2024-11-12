import { useEffect, useState } from "react";
import { AlignEndVertical, Clock, Weight } from "lucide-react";
import toast from "react-hot-toast";
import StatCard from "../../components/cards/StatCard";
import { CLIENT_API } from "../../redux/actions/authActions";
import PersonalDetailsModal from "../../components/modals/PersonalDetailsModal";
import DailyDataModal from "../../components/modals/DailyDataModal";
import ProgramDetailedModal from "../../components/modals/ProgramDetailedModal";

const MemberDashboard = () => {
  const [statData, setStatData] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [userPrograms, setUserPrograms] = useState([]); 
  const [showPersonalDetailsModal, setShowPersonalDetailsModal] = useState(false);
  const [showDailyDataModal, setShowDailyDataModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await CLIENT_API.get("/member/stats");
        const { weight, transformationGoal, totalWorkoutHours, height } = response.data;
        setStatData({ weight, transformationGoal, totalWorkoutHours, height });
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    fetchChartData();
  }, [refresh]);

  useEffect(() => {
    const checkPersonalDetails = async () => {
      try {
        const response = await CLIENT_API.get("/member/personal-details/check");
        if (!response.data.exists) {
          setShowPersonalDetailsModal(true);
        }
      } catch (error) {
        console.error("Error checking personal details:", error);
      }
    };

    checkPersonalDetails();
  }, []);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await CLIENT_API.get("/member/programs");
        setPrograms(response.data);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, [refresh]);

  useEffect(() => {
    const fetchUserPrograms = async () => {
      try {
        const response = await CLIENT_API.get("/member/user-programs");
        setUserPrograms(response.data);
      } catch (error) {
        console.error("Error fetching user programs:", error);
      }
    };

    fetchUserPrograms();
  }, [refresh]);

  const handlePersonalDetailsSubmit = async (details) => {
    try {
      await CLIENT_API.post("/member/personal-details", details);
      toast.success("Personal details saved successfully!");
      setShowPersonalDetailsModal(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error saving personal details:", error);
      toast.error("Error saving personal details");
    }
  };

  const handleMarkAttendance = async () => {
    try {
      const response = await CLIENT_API.get("/member/attendance/check");
      if (!response.data.exists) {
        setShowDailyDataModal(true);
      } else {
        toast.error("You have already marked attendance for today.");
      }
    } catch (error) {
      console.error("Error checking attendance:", error);
      toast.error("Error checking attendance");
    }
  };

  const handleDailyDataSubmit = async (dailyData) => {
    try {
      await CLIENT_API.post("/member/attendance", dailyData);
      toast.success("Attendance marked successfully!");
      setShowDailyDataModal(false);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error marking attendance:", error);
      toast.error("Error marking attendance");
    }
  };

  const handleJoinProgram = async (programId) => {
    try {
      const response = await CLIENT_API.post("/member/join-program", { programId });
      toast.success(response.data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error joining program:", error);
      toast.error("Error joining program");
    }
  };

  const handleOpenProgram = (program) => {
    setSelectedProgram(program);
  };

  const isUserJoinedProgram = (programId) => {
    return userPrograms.some((program) => program._id === programId);
  };

  return (
    <>
      <div className="h-full overflow-y-auto">
        <div className="h-[20%] p-3 px-5 overflow-x-auto flex justify-center pt-4 scrollbar-custom">
          <div className="flex justify-around w-full h-full items-center gap-6">
            <StatCard
              title="Hours"
              count={statData.totalWorkoutHours}
              description="Total Workout Hours"
              Icon={Clock}
            />
            <StatCard
              title="Height"
              count={statData.height}
              description="Current Height"
              Icon={AlignEndVertical}
            />
            <StatCard
              title="Weight"
              count={statData.weight}
              description="Current Weight"
              Icon={Weight}
            />
            <div className="rounded -xl dark:bg-neutral-900 bg-neutral-100 hover:shadow-[0px_0px_31px_1px_#00000024] flex">
              <button
                onClick={handleMarkAttendance}
                className="bg-rex-green rounded-lg px-5 py-3 text-black transition duration-300 hover:bg-rex-green-light font-semibold"
              >
                Mark Attendance
              </button>
            </div>
          </div>
        </div>

        <div className="h-[80%] w-full px-4 p-3 pt-0 pb-4 flex gap-4 flex-col">
          <div className="w-full h-full program-data rounded-xl px-5">
            <h1 className="text-lg mt-3">Programs</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {programs.map((program) => (
                <div key={program._id} className="p-4 border rounded-lg shadow-sm dark:border-neutral-700">
                  <h2 className="text-xl font-semibold">{program.title}</h2>
                  <img src={program.image} alt={program.title} className="w-full h-40 object-cover rounded-lg mt-2" />
                  <div className="flex justify-end pr-3 py-2 mt-2">
                    <button
                      onClick={() => isUserJoinedProgram(program._id) ? handleOpenProgram(program) : handleJoinProgram(program._id)}
                      className="bg-rex-green text-black rounded-lg px-3 py-1 transition duration-300 hover:bg-rex-green-light"
                    >
                      {isUserJoinedProgram(program._id) ? "Open Program" : "Join Program"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PersonalDetailsModal
        isOpen={showPersonalDetailsModal}
        onClose={() => setShowPersonalDetailsModal(false)}
        onDetailsSubmitted={handlePersonalDetailsSubmit}
      />

      <DailyDataModal
        isOpen={showDailyDataModal}
        onClose={() => setShowDailyDataModal(false)}
        onDailyDataSubmitted={handleDailyDataSubmit}
      />

      <ProgramDetailedModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />
    </>
  );
};

export default MemberDashboard;
