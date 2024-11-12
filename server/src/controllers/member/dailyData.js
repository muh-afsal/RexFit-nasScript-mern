import DailyData from "../../model/member/dailyDataSchema.js";
import { verifyAccessToken } from "../../utils/services/jwtServices.js";

export const markAttendance = async (req, res) => {
  const { attendance, currentWeight, workoutTime, bodyPart } = req.body;

  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const decodedToken = verifyAccessToken(token);
    const userId = decodedToken?.id;

    const dailyData = new DailyData({
      userId: userId,
      attendance,
      currentWeight,
      workoutTime,
      workoutArea: bodyPart,
    });

    await dailyData.save();
    res.status(201).json({ message: "Attendance marked successfully!" });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAttendance = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const decodedToken = verifyAccessToken(token);
    const userId = decodedToken?.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyData = await DailyData.findOne({
      userId: userId,
      date: { $gte: today },
    });

    if (dailyData) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  } catch (error) {
    console.error("Error checking attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getDailyData = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Token not provided" });

    const decodedToken = verifyAccessToken(token);
    const userId = decodedToken?.id;
    
    const dailyData = await DailyData.find({ userId }).sort({ date: -1 });

    res.status(200).json(dailyData);
  } catch (error) {
    console.error("Error fetching daily data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
