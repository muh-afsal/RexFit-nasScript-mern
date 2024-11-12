import User from "../../model/userSchema.js";


export const fetchAllMembers = async (req, res) => {
  try {
    const users = await User.find({ role: 'member' });
    res.status(200).json(users); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users data", error: err });
  }
};


export const blockUnblockMember = async (req, res) => {
  const { id, access } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !access; 
    await user.save(); 

    return res.status(200).json({
      message: `User has been ${user.isBlocked ? "blocked" : "unblocked"}`,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing the block/unblock request", error: err });
  }
};


export const checkUserStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ isBlocked: user.isBlocked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error checking user status", error: err });
  }
};
