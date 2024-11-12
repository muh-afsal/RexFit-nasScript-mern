import mongoose from "mongoose";

const personalDetailsSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  age: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  fitnessLevel: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
  },
  transformationGoal: {
    type: String,
  },
}, { timestamps: true });

const PersonalDetails = mongoose.model("PersonalDetails", personalDetailsSchema);

export default PersonalDetails;
