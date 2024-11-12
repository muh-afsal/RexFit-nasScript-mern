import mongoose from "mongoose";


const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String, 
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    isAllowed: {
      type: Boolean,
      default: false, 
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Program = mongoose.model("Program", programSchema);

export default Program;
