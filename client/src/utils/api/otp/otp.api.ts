import { post } from "../apiMethod";

const INITIAL_ROUTE = "otp";
export const requestOtp = async (phoneNumber: string) => {
  try {
    const response = await post(`/${INITIAL_ROUTE}/request-otp`, {
      phoneNumber,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const verifyOtp = async (phoneNumber: string, otp: string) => {
  try {
    const response = await post(`/${INITIAL_ROUTE}/verify-otp`, {
      phoneNumber,
      otp,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
