import Program from '../../model/program/programSchema.js';

// Function to get the total income by date
export const programIncome = async (req, res) => {
  try {
    const dailyIncome = await Program.aggregate([
      {
        $project: {
          createdAt: 1,
          programIncome: { $multiply: ["$price", { $size: "$members" }] }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          amount: { $sum: "$programIncome" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formattedIncome = dailyIncome.map(item => ({
      date: item._id,
      amount: item.amount
    }));

    res.json({ dailyIncome: formattedIncome });
  } catch (error) {
    console.error("Error fetching income data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const programJoinedMembers = async (req, res) => {
  try {
    const dailyMemberCount = await Program.aggregate([
      {
        $project: {
          createdAt: 1,
          membersCount: { $size: "$members" }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          joinedMembers: { $sum: "$membersCount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const formattedMemberCount = dailyMemberCount.map(item => ({
      date: item._id,
      joinedMembers: item.joinedMembers
    }));

    res.json({ dailyMemberCount: formattedMemberCount });
  } catch (error) {
    console.error("Error fetching joined members count data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

