import { useEffect, useState } from "react";
import CLIENT_API from "../../utils/axios/axiosInterceptor";
import StatCard from "../../components/cards/StatCard";
import { AlignEndVertical, Clock, Utensils, Weight } from "lucide-react";
import Modal from "../../components/modals/Modal";
import moment from "moment";

const MyProgress = () => {
  const [statData, setStatData] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDayData, setSelectedDayData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await CLIENT_API.get("/member/stats");

        const { weight, transformationGoal, totalWorkoutHours, height } =
          response.data;
        setStatData({ weight, transformationGoal, totalWorkoutHours, height });
      } catch (err) {
        console.error("Error fetching chart data:", err);
      }
    };

    const fetchAttendanceData = async () => {
      try {
        const response = await CLIENT_API.get("/member/daily-data");
        setAttendanceData(response.data);
      } catch (err) {
        console.error("Error fetching attendance data:", err);
      }
    };

    fetchChartData();
    fetchAttendanceData();
  }, []);

  const handleDayClick = (day) => {
    const dayData = attendanceData.find((data) => data.date === day);
    console.log(day);

    setSelectedDayData(dayData);
    setSelectedDay(day);
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
    setSelectedDayData(null);
  };

  const currentMonth = moment().format("MMMM YYYY");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalDaysInMonth = moment().daysInMonth();
  const firstDayOfMonth = moment().startOf("month").day();

  const calendarGrid = Array(6)
    .fill()
    .map((_, rowIndex) => {
      return Array(7)
        .fill()
        .map((_, colIndex) => {
          const dayNumber = rowIndex * 7 + colIndex - firstDayOfMonth + 1;
          return dayNumber > 0 && dayNumber <= totalDaysInMonth
            ? dayNumber
            : null;
        });
    });

  return (
    <div className="h-full w-full">
      <div className="h-[25%] w-full p-5">
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
          <StatCard
            title="Calorie"
            count={"2500"}
            description="Needed Calorie Intake"
            Icon={Utensils}
          />
        </div>
      </div>

      <div className=" h-[75%] w-full p-5 pt-0">
        <div className="w-full h-full dark:bg-neutral-900 bg-neutral-100 text-black rounded-xl p-4">
          <h2 className="dark:text-white text-black text-xl">{currentMonth}</h2>
          <table className="w-full mt-4 border-collapse">
            <thead>
              <tr>
                {daysOfWeek.map((day, index) => (
                  <th
                    key={index}
                    className="dark:text-white text-black p-4 rounded-lg  border border-gray-400"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {calendarGrid.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((day, colIndex) => {
                    const attendance = day
                      ? attendanceData.find((data) =>
                          moment(data.date).isSame(
                            moment()
                              .startOf("month")
                              .add(day - 1, "days"),
                            "day"
                          )
                        )
                      : null;

                    return (
                      <td
                        key={colIndex}
                        className="text-center dark:text-white p-2 border border-gray-400 cursor-pointer"
                        onClick={() => day && handleDayClick(day)}
                      >
                        {day && (
                          <>
                            {attendance ? (
                              <span className="dark:text-white">
                                {attendance.workoutArea}
                              </span>
                            ) : (
                              colIndex === 0 && "Holiday"
                            )}
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedDay && selectedDayData && (
        <Modal onClose={handleCloseModal}>
          <h2 className="text-lg text-white">Details for {selectedDay}</h2>
          <div className="text-white">
            <p>
              <strong>Attendance:</strong>{" "}
              {selectedDayData.attendance ? "Present" : "Absent"}
            </p>
            <p>
              <strong>Workout Time:</strong> {selectedDayData.workoutTime} hours
            </p>
            <p>
              <strong>Workout Area:</strong> {selectedDayData.workoutArea}
            </p>
            <p>
              <strong>Current Weight:</strong> {selectedDayData.currentWeight}{" "}
              kg
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyProgress;
