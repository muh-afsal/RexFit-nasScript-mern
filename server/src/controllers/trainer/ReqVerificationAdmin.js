

import User from "../../model/userSchema.js";
import { verifyAccessToken } from "../../utils/services/jwtServices.js";

export const checkAdminVerification = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    const decodedToken = verifyAccessToken(token);
    const userId = decodedToken?.id;
    
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ isVerifiedByAdmin: user.isVerifiedByAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
