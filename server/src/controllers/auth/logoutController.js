export const logoutController = async (req, res) => {
    try {
      
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
  
      res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Logout failed', error: error });
    }
  };
  