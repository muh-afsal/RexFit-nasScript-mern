import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    requestFrom: {
      type: String,
      enum: ["member", "trainer"],
      required: true,
    },
    requesterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requestTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    requestDate: {
      type: Date,
      default: Date.now,
    },
    decisionDate: {
      type: Date,
    },
    requestType: {
      type: String,
      enum: ["regRequest", "joinRequest"],
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("JoinRequest", requestSchema);

export default Request;
