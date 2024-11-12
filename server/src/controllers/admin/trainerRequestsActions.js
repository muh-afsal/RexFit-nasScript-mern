import Request from "../../model/joinRequestSchema.js";
import User from "../../model/userSchema.js";

export const getTrainerRequests = async (req, res) => {
  try {
    const trainerRequests = await Request.find({ requestFrom: "trainer", status: "pending" })
      .populate("requesterId", "Username email")
      .sort({ requestDate: -1 });
    
    res.status(200).json(trainerRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching trainer requests" });
  }
};


export const updateTrainerRequestStatus = async (req, res) => {
  const { requestId, status } = req.body;

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { status, decisionDate: new Date() },
      { new: true }
    );

    if (status === "approved" && updatedRequest) {
      await User.findByIdAndUpdate(
        updatedRequest.requesterId,
        { isVerifiedByAdmin: true }
      );
    }

    res.status(200).json({ message: `Request ${status} successfully`, updatedRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating request status" });
  }
};
