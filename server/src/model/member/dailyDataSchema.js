import mongoose from "mongoose";

const dailyDataSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  attendance: {
    type: Boolean,
    default: false,
  },
  currentWeight: {
    type: Number,
    required: true,
  },
  workoutTime: {
    type: Number,
    required: true,
  },
  workoutArea: {
    type: String,
    enum: ["chest", "back", "arms", "legs", "shoulders", "core"],
    required: true,
  },
}, { timestamps: true });

const DailyData = mongoose.model("DailyData", dailyDataSchema);

export default DailyData;
