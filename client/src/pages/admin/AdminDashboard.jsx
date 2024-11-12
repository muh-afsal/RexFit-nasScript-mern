import { useEffect, useState } from "react";
import { Dumbbell, IndianRupee, Speech, Users } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import StatCard from "../../components/cards/StatCard";
import TrainerRequestCard from "../../components/cards/TrainerRequestCard";
import { CLIENT_API } from "../../redux/actions/authActions";
import DoughnutChart from "../../components/charts/DoughnutChart";
import BarChart from "../../components/charts/BarChart";
import LineChart from "../../components/charts/LineChart";

const AdminDashboard = () => {
  const [trainerRequests, setTrainerRequests] = useState([]);
  const [statData, setstatData] = useState({});
  

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const fetchTrainerRequests = async () => {
      try {
        const response = await CLIENT_API.get("/admin/trainer-requests");
        setTrainerRequests(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrainerRequests();
  }, [refresh]);


  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const response = await CLIENT_API.get("/admin/stats");
        const { totalMembers, totalTrainers, totalPrograms,totalIncome } = response.data;
        setstatData({totalMembers, totalTrainers, totalPrograms ,totalIncome})
        setChartData({
          labels: ["Members", "Trainers", "Programs"],
          datasets: [
            {
              label: "Admin Stats",
              data: [totalMembers, totalTrainers, totalPrograms],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching chart data:", err);
        setError("Could not fetch chart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const updateRequestStatus = async (requestId, status) => {
    try {
      await CLIENT_API.patch("/admin/trainer-requests/status", {
        requestId,
        status,
      });
      toast.success(
        `Request ${status === "approved" ? "approved" : "rejected"} successfully`
      );

      setTrainerRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== requestId)
      );

      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error updating request status:", error);
      toast.error("Error updating request status");
    }
  };

  const handleApprove = (requestId) => {
    updateRequestStatus(requestId, "approved");
  };

  const handleReject = (requestId) => {
    updateRequestStatus(requestId, "rejected");
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="h-full overflow-y-auto">
        <div className="h-[20%] p-3 px-5 overflow-x-auto flex justify-center pt-4 scrollbar-custom">
          <div className="flex justify-around w-full h-full items-center gap-6">
            <StatCard title="Income" count={statData.totalIncome} description="Total programs income" Icon={IndianRupee} />
            <StatCard title="Total Members" count={statData.totalMembers} description="Users Joined till now" Icon={Users} />
            <StatCard title="Total Trainers" count={statData.totalTrainers} description="Current Active Trainers" Icon={Speech} />
            <StatCard title="Programs" count={statData.totalPrograms} description="Current Active Programs" Icon={Dumbbell} />
          </div>
        </div>

        <div className="md:h-[40%] h-full w-full flex p-4 gap-4 flex-col md:flex-row">
          <div className="chat-div-doughnuts md:w-[50%] w-full h-full dark:bg-neutral-900 bg-neutral-100 rounded-xl p-3">
            <BarChart />
          </div>
          <div className="md:w-[50%] w-full h-full dark:bg-neutral-900 bg-neutral-100 rounded-xl p-2 overflow-y-auto scrollbar-custom">
            <h1 className="font-bold text-xl pl-5 mb-3 dark:text-neutral-500 text-neutral-500">
              Pending requests from Trainers
            </h1>
            {trainerRequests.length > 0 ? (
              trainerRequests.map((request) => (
                <TrainerRequestCard
                  key={request._id}
                  name={request.requesterId.Username}
                  email={request.requesterId.email}
                  date={request.requestDate}
                  onApprove={() => handleApprove(request._id)}
                  onReject={() => handleReject(request._id)}
                />
              ))
            ) : (
              <p className="pl-5 w-full h-full flex justify-center items-center">
                No Pending Requests from Trainers
              </p>
            )}
          </div>
        </div>
        <div className="h-[40%] w-full px-4 p-3 pt-0 pb-4 flex gap-4">
          <div className="w-[35%] h-full dark:bg-neutral-900 bg-neutral-100 rounded-xl">
            <DoughnutChart chartData={chartData} loading={loading} error={error} />
          </div>
          <div className="w-[65%] h-full dark:bg-neutral-900 bg-neutral-100 rounded-xl p-3">
          <LineChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
