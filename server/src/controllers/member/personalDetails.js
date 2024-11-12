import PersonalDetails from '../../model/member/personalDetailsSchema.js';
import User from '../../model/userSchema.js'
import { verifyAccessToken } from '../../utils/services/jwtServices.js';






export const checkPersonalDetails = async (req, res) => {
  try {

    const token = req.cookies.accessToken;
if (!token) return res.status(401).json({ message: 'Token not provided' });

const decodedToken = verifyAccessToken(token);
const userId = decodedToken?.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User  not found' });

    const personalDetails = await PersonalDetails.findOne({ userId: userId });
    if (personalDetails || user.isPersonalDataSubmitted) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  } catch (error) {
    console.error("Error checking personal details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const savePersonalDetails = async (req, res) => {
  const { age, weight, height, fitnessLevel, transformationType } = req.body;

  try {

    const token = req.cookies.accessToken;
if (!token) return res.status(401).json({ message: 'Token not provided' });

const decodedToken = verifyAccessToken(token);
const userId = decodedToken?.id;

    const personalDetails = new PersonalDetails({
      userId: userId,
      age,
      weight,
      height,
      fitnessLevel,
      transformationGoal:transformationType,
    });

    await personalDetails.save();

    await User.findByIdAndUpdate(userId, { isPersonalDataSubmitted: true });

    res.status(201).json({ message: "Personal details saved successfully!" });
  } catch (error) {
    console.error("Error saving personal details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};