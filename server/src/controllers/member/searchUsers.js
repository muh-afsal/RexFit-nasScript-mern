

import User from "../../model/userSchema.js";

export const searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({
      role: "member", 
      $or: [
        { firstname: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
};
