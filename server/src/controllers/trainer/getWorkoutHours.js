import DailyData from "../../model/member/dailyDataSchema.js";

export const getTotalWorkoutHours = async (req, res) => {
  try {
    const result = await DailyData.aggregate([
      {
        $group: {
          _id: "$workoutArea",
          totalWorkoutTime: { $sum: "$workoutTime" }
        }
      }
    ]);

    const workoutData = result.map(item => ({
      workoutArea: item._id,
      totalHours: (item.totalWorkoutTime / 60).toFixed(2)
    }));

    res.status(200).json({ success: true, workoutData });
  } catch (error) {
    console.error("Error fetching workout data:", error);
    res.status(500).json({ success: false, message: "Error fetching workout data." });
  }
};