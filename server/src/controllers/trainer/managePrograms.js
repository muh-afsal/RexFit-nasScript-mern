import Program from "../../model/program/programSchema.js";


export const fetchPrograms = async (req, res) => {
  try {
    const programs = await Program.find();
    res.status(200).json( programs );
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching programs" });
  }
};



export const handleAllow = async (req, res) => {
    const { id, isDisabled } = req.body;
    try {
      const program = await Program.findById(id);
      if (!program) {
        return res.status(404).json({ success: false, message: "Program not found" });
      }
  
      program.isDisabled = isDisabled;
      await program.save();
  
      res.status(200).json({ success: true, message: `Program ${isDisabled ? "disabled" : "enabled"} successfully` });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error updating program status" });
    }
  };
  


export const isAllowed = async (req, res) => {
  const { id } = req.params;
  try {
    const program = await Program.findById(id);
    if (!program) {
      return res.status(404).json({ success: false, message: "Program not found" });
    }

    res.status(200).json({ success: true, isAllowed: program.isAllowed });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error checking program status" });
  }
};
