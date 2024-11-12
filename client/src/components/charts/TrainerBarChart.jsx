import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js"; 
import { CLIENT_API } from "../../redux/actions/authActions";

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TrainerBarChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await CLIENT_API.get("/trainer/workout-hours");

        const { workoutData } = response.data; 

        setChartData({
          labels: workoutData.map(item => item.workoutArea), // Workout areas as labels
          datasets: [
            {
              label: "Total Workout Hours",
              data: workoutData.map(item => item.totalHours), // Total workout hours as data
              backgroundColor: "#36A2EB",
              borderColor: "#36A2EB",
              borderWidth: 1,
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

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Workout Hours by Area",
      },
    },
  };

  if (loading) {
    return <p>Loading chart...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center ">
      {chartData ? (
        <div className="w-full h-full">
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default TrainerBarChart;