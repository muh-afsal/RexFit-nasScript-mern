import { useEffect, useState } from "react";
import { Dumbbell, Users } from "lucide-react";
import  { Toaster } from "react-hot-toast";
import StatCard from "../../components/cards/StatCard";
import { CLIENT_API } from "../../redux/actions/authActions";
import DoughnutChart from "../../components/charts/DoughnutChart";
import LineChart from "../../components/charts/LineChart";
import TrainerBarChart from "../../components/charts/TrainerBarChart";

const TrainerDashboard = () => {
  const [statData, setstatData] = useState({});

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const response = await CLIENT_API.get("/admin/stats");
        const { totalMembers, totalTrainers, totalPrograms, totalIncome } =
          response.data;
        setstatData({
          totalMembers,
          totalTrainers,
          totalPrograms,
          totalIncome,
        });
        setChartData({
          labels: ["Members", "Programs"],
          datasets: [
            {
              label: "Admin Stats",
              data: [totalMembers, totalPrograms],
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

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="h-full overflow-y-auto">
        <div className="md:h-[50%] h-full w-full flex p-4 gap-4 flex-col md:flex-row">
          <div className="chat-div-doughnuts md:w-[50%] w-full h-full dark:bg-neutral-900 bg-neutral-100 rounded-xl p-3">
            <TrainerBarChart />
          </div>
          <div className="md:w-[50%] py-[50px]  flex justify-around w-full h-full dark:bg-neutral-900 bg-neutral-100 rounded-xl p-2 overflow-y-auto scrollbar-custom">
            
            <StatCard
              title="Total Members"
              count={statData.totalMembers}
              description="Users Joined till now"
              Icon={Users}
            />
            <StatCard
              title="Programs"
              count={statData.totalPrograms}
              description="Current Active Programs"
              Icon={Dumbbell}
            />
          </div>
        </div>
        <div className="h-[50%] w-full px-4 p-3 pt-0 pb-4 flex gap-4">
          <div className="w-[35%] h-full dark:bg-neutral-900 bg-neutral-100 rounded-xl">
            <DoughnutChart
              chartData={chartData}
              loading={loading}
              error={error}
            />
          </div>
          <div className="w-[65%] h-full dark:bg-neutral-900 bg-neutral-100 rounded-xl p-3">
            <LineChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerDashboard;
