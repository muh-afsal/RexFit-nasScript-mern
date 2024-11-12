import Program from "../../model/program/programSchema.js";

export const getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({isDisabled:false});
    res.status(200).json(programs);
  } catch (error) {
    console.error("Error fetching programs:", error);
    res.status(500).json({ message: "Failed to fetch programs." });
  }
};
