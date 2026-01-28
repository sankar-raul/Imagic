import { createHash, randomInt } from "crypto";

class Otp {
  #hashOtp(otp: string) {
    if (!otp) return;
    return createHash("sha256").update(otp).digest("hex"); // 🔒
  }
  generateOtp(length = 6) {
    let otp = "";
    while (length--) {
      otp += randomInt(0, 9).toString();
    }
    return [this.#hashOtp(otp), otp];
  }
  verify(otp: string, hashedOtp: string) {
    return this.#hashOtp(otp) === hashedOtp;
  }
}
const OTP = new Otp();
export default OTP;
