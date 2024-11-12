import User from "../../model/userSchema.js";
import Program from "../../model/program/programSchema.js";

export const getAdminStats = async (req, res) => {
  try {
    const trainerCount = await User.countDocuments({ role: "trainer" });

    const memberCount = await User.countDocuments({ role: "member" });

    const programCount = await Program.countDocuments();

    const totalAmount = await Program.aggregate([
      {
        $project: {
          totalIncome: { $multiply: ["$price", { $size: "$members" }] }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalIncome" }
        }
      }
    ]);
  
    const totalIncome=totalAmount[0]?.totalAmount || 0
    

    res.status(200).json({
      totalTrainers: trainerCount,
      totalMembers: memberCount,
      totalPrograms: programCount,
      totalIncome: totalIncome,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};
