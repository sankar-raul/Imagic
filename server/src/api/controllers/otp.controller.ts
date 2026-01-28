import { Request, Response } from "express";
import OtpModel from "../../models/otp/otp.model";
import OTP from "../../service/otp/generateOtp";
import { sendOtpViaWhatsapp } from "../../service/otp/sendOtp";

// Request OTP and Resend Otp
export const requestOtp = async (req: Request, res: Response) => {
  try {
    let { phoneNumber } = req.body || {};

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }
    phoneNumber = phoneNumber.toString().trim();
    // Validate Indian phone number format: 10 digits, starts with 6-9
    if (phoneNumber.startsWith("+91")) {
      phoneNumber = phoneNumber.slice(3);
    }
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(phoneNumber)) {
      return res
        .status(400)
        .json({ message: "Invalid Indian phone number format" });
    }

    // Check for existing unexpired OTP for this phone number
    const now = new Date();
    let otpRecord = await OtpModel.findOne({
      phoneNumber,
      expiresAt: { $gt: now },
    }).sort({ createdAt: -1 });
    if (otpRecord) {
      // Check for max resend attempts
      if (otpRecord.attemptCount >= 5) {
        return res.status(429).json({
          message:
            "Maximum OTP resend attempts reached. Please try again later.",
        });
      }
      // Check if 30 seconds have passed since last OTP was created
      const createdAt = new Date(otpRecord.createdAt);
      if (now.getTime() - createdAt.getTime() < 30 * 1000) {
        const waitTime =
          30 - Math.floor((now.getTime() - createdAt.getTime()) / 1000);
        return res.status(429).json({
          message: `Please wait ${waitTime} seconds before resending OTP.`,
        });
      }
      // Increment attemptCount and resend new OTP
      const [hashedOtp, newOtp] = OTP.generateOtp(6);
      otpRecord.hashedOtp = hashedOtp;
      otpRecord.createdAt = now;
      otpRecord.expiresAt = new Date(now.getTime() + 5 * 60 * 1000);
      await otpRecord.save();
      await sendOtpViaWhatsapp(phoneNumber, newOtp);
      res.status(200).json({ message: "OTP resent successfully" });
      return;
    }

    // No unexpired OTP, generate and send a new one
    const [hashedOtp, newOtp] = OTP.generateOtp(6);
    const otpEntry = new OtpModel({
      phoneNumber,
      hashedOtp: hashedOtp,
      createdAt: now,
      expiresAt: new Date(now.getTime() + 5 * 60 * 1000),
    });
    await otpEntry.save();
    await sendOtpViaWhatsapp(phoneNumber, newOtp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    let { phoneNumber, otp } = req.body || {};
    if (!phoneNumber || !otp) {
      return res
        .status(400)
        .json({ message: "Phone number and OTP are required" });
    }
    phoneNumber = phoneNumber.toString().trim();
    otp = otp.toString().trim();
    if (phoneNumber.startsWith("+91")) {
      phoneNumber = phoneNumber.slice(3);
    }
    const otpRecord = await OtpModel.findOne({ phoneNumber }).sort({
      createdAt: -1,
    });
    if (!otpRecord) {
      return res
        .status(400)
        .json({ message: "OTP not found. Please request a new one." });
    }
    if (otpRecord.attemptCount >= 5) {
      res.status(429).json({
        message: "Maximum OTP resend attempts reached. Please try again later.",
      });
      return;
    }
    if (otpRecord.expiresAt < new Date()) {
      res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one." });
      return;
    }
    const isValid = OTP.verify(otp, otpRecord.hashedOtp);
    if (!isValid) {
      await otpRecord.updateOne({ $inc: { attemptCount: 1 } });
      res.status(400).json({ message: "Invalid OTP. Please try again." });
      return;
    }
    otpRecord
      .deleteOne()
      .catch((err) => console.error("Failed to delete OTP record:", err));
    // Reset attemptCount after successful verification
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};
