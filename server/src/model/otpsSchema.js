import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60000), 
      index: { expires: "10m" }, 
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;
