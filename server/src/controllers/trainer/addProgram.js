

import Program from "../../model/program/programSchema.js";

export const addProgram = async (req, res) => {
  const { title, description, image, price, members, creator } = req.body;
  try {
    const program = new Program({
      title,
      description,
      image,
      price,
      members,
    });
    await program.save();
    res.status(201).json({ success: true, program });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ success: false, message: "Error creating program" });
  }
};
