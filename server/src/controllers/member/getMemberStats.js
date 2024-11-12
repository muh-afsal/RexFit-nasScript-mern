import mongoose from "mongoose";
import DailyData from "../../model/member/dailyDataSchema.js";
import PersonalDetails from "../../model/member/personalDetailsSchema.js";
import { verifyAccessToken } from "../../utils/services/jwtServices.js";

export const getMemberStats = async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      if (!token) return res.status(401).json({ message: "Token not provided" });
  
      const decodedToken = verifyAccessToken(token);
      const userId = decodedToken?.id;
  
      // Get personal details (weight, height, transformation goal)
      const personalDetails = await PersonalDetails.findOne({ userId });
      if (!personalDetails) {
        return res.status(404).json({ message: "User personal details not found" });
      }
  
      const { weight, height, transformationGoal } = personalDetails;
  
      // Calculate total workout hours (convert minutes to hours)
      const totalWorkoutData = await DailyData.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: null,
            totalWorkoutMinutes: { $sum: "$workoutTime" },
          },
        },
      ]);
      
  
      const totalWorkoutHours = (totalWorkoutData[0]?.totalWorkoutMinutes || 0) / 60;
  
      res.status(200).json({
        weight,
        height,
        transformationGoal,
        totalWorkoutHours,
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

export const getWorkoutHoursPerDay = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const decodedToken = verifyAccessToken(token);
    const userId = decodedToken?.id;

    const workoutHoursPerDay = await DailyData.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          dailyWorkoutMinutes: { $sum: "$workoutTime" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const formattedWorkoutHoursPerDay = workoutHoursPerDay.map((entry) => ({
      date: entry._id,
      workoutHours: entry.dailyWorkoutMinutes / 60,
    }));

    res.status(200).json({
      workoutHoursPerDay: formattedWorkoutHoursPerDay,
    });
  } catch (error) {
    console.error("Error fetching workout hours per day:", error);
    res.status(500).json({ message: "Server error" });
  }
};
