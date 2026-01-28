import { model } from "mongoose";
import { IOtp } from "../../Types/interface/otp.interface";
import otpSchema from "./otp.schema";

const OtpModel = model<IOtp>("otps", otpSchema);
export default OtpModel;
