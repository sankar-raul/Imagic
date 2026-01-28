const COUNTRY_CODE = "+91";
export const sendOtpViaWhatsapp = async (
  phoneNumber: string,
  otp: string,
): Promise<void> => {
  // Integrate with WhatsApp API to send the OTP
  console.log(`Sending OTP ${otp} to WhatsApp number ${phoneNumber}`);
};
export const sendOtpViaSms = async (
  phoneNumber: string,
  otp: string,
): Promise<void> => {
  // Integrate with SMS API to send the OTP
  console.log(`Sending OTP ${otp} to SMS number ${phoneNumber}`);
};
