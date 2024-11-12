import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js"; 
import { CLIENT_API } from "../../redux/actions/authActions"; // Adjust the path as necessary

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const LineChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await CLIENT_API.get("/admin/joined-members"); 

        const { dailyMemberCount } = response.data; 

        setChartData({
          labels: dailyMemberCount.map(item => item.date),
          datasets: [
            {
              label: "Joined Members",
              data: dailyMemberCount.map(item => item.joinedMembers),
              borderColor: "#E97451",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              pointStyle: 'circle',
              pointRadius: 10,
              pointHoverRadius: 10,
              fill: true, 
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
    scales: {
      x: {
        grid: {
          color: '#71797E', 
        },
      },
      y: {
        grid: {
          color: '#71797E',
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily Joined Members",
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
    <div className="w-full h-full flex justify-center items-center">
      {chartData ? (
        <div className="w-full h-full">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default LineChart;