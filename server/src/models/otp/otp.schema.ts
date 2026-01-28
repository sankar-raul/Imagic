import { Schema } from "mongoose";
import { IOtp } from "../../Types/interface/otp.interface";
const otpSchema = new Schema<IOtp>({
  hashedOtp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    index: true,
  },
  attemptCount: {
    type: Number,
    default: 0,
  },
});

export default otpSchema;
