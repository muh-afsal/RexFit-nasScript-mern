// controllers/authController.js
import { verifyAccessToken } from '../../utils/services/jwtServices.js';
import User from '../../model/userSchema.js';

export const fetchUser = async (req, res) => {
  try {
    
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    const decodedToken = verifyAccessToken(token);
    const userId = decodedToken?.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    

    res.status(200).json({
        success: true,
        message: "fetchuser successful",
        user: {
            id: user._id,
            Username: user.Username,
            email: user.email,
            role: user.role,
        },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};
