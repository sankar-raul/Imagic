import { api } from "@/utils/api";
import { useState } from "react";

const useOtp = () => {
  const [verifyError, setVerifyError] = useState<null | string>(null);
  const [sendError, setSendError] = useState<null | string>(null);
  const requestOtp = async (phoneNumber: string) => {
    try {
      setSendError(null);
      const response = await api.otp.requestOtp(phoneNumber);
      return response;
    } catch (error) {
      setSendError("Failed to request OTP. Please try again.");
      throw error;
    }
  };
  const verifyOtp = async (phoneNumber: string, otp: string) => {
    try {
      setVerifyError(null);
      const response = await api.otp.verifyOtp(phoneNumber, otp);
      return response;
    } catch (error) {
      setVerifyError("Failed to verify OTP. Please try again.");
      throw error;
    }
  };
  return {
    requestOtp,
    verifyOtp,
    sendError,
    verifyError,
  };
};

export default useOtp;
