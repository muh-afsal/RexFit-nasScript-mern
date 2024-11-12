import Program from '../../model/program/programSchema.js';
import { verifyAccessToken } from '../../utils/services/jwtServices.js';

export const joinProgram = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: 'Token not provided' });
    
    const decodedToken = verifyAccessToken(token);
    const userId = decodedToken?.id;

    const { programId } = req.body;

    const program = await Program.findById(programId);
    if (!program) {
      return res.status(404).json({ message: "Program not found." });
    }

    if (program.members.includes(userId)) {
      return res.status(200).json({ message: "You are already a member of this program." });
    }

    program.members.push(userId);
    await program.save();

    res.status(200).json({ message: "Successfully joined the program!" });
  } catch (error) {
    console.error("Error joining program:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPrograms = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: 'Token not provided' });

    const decodedToken = verifyAccessToken(token);
    const userId = decodedToken?.id;

    const programs = await Program.find({ members: userId });
    res.status(200).json(programs);
  } catch (error) {
    console.error("Error fetching user programs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProgramDetails = async (req, res) => {
  try {
    const { programId } = req.params;

    const program = await Program.findById(programId).populate('members', 'name email');
    if (!program) {
      return res.status(404).json({ message: "Program not found." });
    }

    res.status(200).json(program);
  } catch (error) {
    console.error("Error fetching program details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};