import React, { FC, useState } from "react";
import { BookOpen, CheckCircle } from "lucide-react";
import formImage from "@/assets/images/demoClass.png";
import { motion } from "framer-motion";
import useSubmitDemoClass from "@/hooks/demoClass/useDemoClass";
import useGetAvailableCourses from "@/hooks/course/useGetAvailableCourses";
import useOtp from "@/hooks/otp/useOtp";
import { useToast } from "@/contexts/ToastContext";

interface DemoClassFormProps {
  minimal?: boolean;
  id?: string;
}
const DemoClassSection: FC<DemoClassFormProps> = ({
  minimal = false,
  id = "democlass",
}) => {
  const { courses } = useGetAvailableCourses();
  const { isLoading, submitDemoClassForm } = useSubmitDemoClass();
  const { showError, showSuccess } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    courseInterested: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // OTP state
  const { requestOtp, verifyOtp, verifyError: otpError } = useOtp();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [isOtpSendError, setIsOtpSendError] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (
        formData.fullName &&
        formData.email &&
        formData.phoneNumber &&
        formData.courseInterested &&
        otpVerified
      ) {
        await submitDemoClassForm(formData);
        setSubmitted(true);
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          courseInterested: "",
        });
        setOtp("");
        setOtpSent(false);
        setOtpVerified(false);
        setOtpMessage("");
        setIsSubmitting(false);
        showSuccess("Application submitted successfully!");
      }
    } catch (error) {
      showError("Error submitting form. Please try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // OTP handlers
  const handleSendOtp = async () => {
    setOtpLoading(true);
    setOtpMessage("");
    try {
      await requestOtp(formData.phoneNumber);
      setOtpSent(true);
      setIsOtpSendError(false);
      setOtpMessage("OTP sent to your phone number.");
      showSuccess("OTP sent to your phone number.");
    } catch (e) {
      setIsOtpSendError(true);
      setOtpMessage("Failed to send OTP. Please try again.");
      showError("Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setOtpLoading(true);
    try {
      await verifyOtp(formData.phoneNumber, otp);
      setOtpVerified(true);
      setOtpMessage("Phone number verified!");
      showSuccess("Phone number verified!");
    } catch (e) {
      showError("Invalid OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8" id={id}>
      <motion.div
        initial={{
          opacity: 0,
          y: 200,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          damping: 200,
          stiffness: 100,
          duration: 1,
        }}
        viewport={{
          once: true,
        }}
        className="w-full max-w-6xl bg-white border border-neutral-100 rounded-3xl overflow-hidden group/form"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="w-full lg:grow p-6 sm:p-8 lg:p-12">
            <div className="mb-6">
              <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wide mb-2">
                Start Your Journey
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                Apply for a
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r bg-yellow-500">
                  Demo Class
                </span>
              </h1>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 ml-1">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 ml-1">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 ml-1">
                  Phone number
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    disabled={otpVerified}
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      handleChange(e);
                      setOtpSent(false);
                      setOtpVerified(false);
                      setOtp("");
                      setOtpMessage("");
                    }}
                    placeholder="+910000000000"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                  />
                  <button
                    type="button"
                    className={
                      "bg-yellow-500 text-white whitespace-nowrap px-4 py-2 rounded-xl font-semibold disabled:opacity-60 " +
                      (otpVerified ? "bg-green-500!" : "")
                    }
                    onClick={handleSendOtp}
                    disabled={
                      otpLoading ||
                      !formData.phoneNumber ||
                      otpSent ||
                      otpVerified
                    }
                  >
                    {otpLoading && !otpSent
                      ? "Sending..."
                      : otpVerified
                        ? "Verified"
                        : otpSent
                          ? "Sent"
                          : "Send OTP"}
                  </button>
                </div>
                {otpMessage && (
                  <p
                    className={`text-xs mt-1 ${otpVerified ? "text-green-600" : isOtpSendError ? "text-red-600" : "text-neutral-600"}`}
                  >
                    {otpMessage}
                  </p>
                )}
                {otpSent && !otpVerified && (
                  <div className="mt-2 flex gap-2">
                    <input
                      type="number"
                      maxLength={6}
                      minLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-gray-900 placeholder-gray-400"
                    />
                    <button
                      type="button"
                      className="bg-green-600 whitespace-nowrap text-white px-4 py-2 rounded-xl font-semibold disabled:opacity-60"
                      onClick={handleVerifyOtp}
                      disabled={otpLoading || !otp}
                    >
                      {otpLoading ? "Verifying..." : "Verify OTP"}
                    </button>
                  </div>
                )}
                {otpError && (
                  <p className="text-xs text-red-600 mt-1">{otpError}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5 ml-1">
                  Course interested in
                </label>
                <select
                  name="courseInterested"
                  value={formData.courseInterested}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition text-gray-900 appearance-none cursor-pointer"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !otpVerified}
                className="w-full bg-neutral-900 text-white font-semibold py-3.5 px-6 rounded-xl hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-90 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-3 border-x-white border-y-transparent"></div>
                ) : submitted ? (
                  <>
                    <CheckCircle size={20} />
                    Application Submitted!
                  </>
                ) : (
                  <>
                    <BookOpen size={20} />
                    Apply for Demo Class
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By applying, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>

          {/* Illustration Section */}
          {!minimal && (
            <div className="w-full lg:grow p-6 sm:p-8 lg:p-12 flex items-baseline justify-center relative overflow-hidden">
              <div className="absolute inset-0">
                <img
                  src={formImage}
                  alt="form image"
                  className="bg-red w-full group-hover/form:scale-105 duration-200 mx-auto h-full object-cover object-bottom"
                />
                <div className="absolute inset-0"></div>
              </div>
              <div className="flex-col z-1 ">
                <div className="space-y-4 text-center text-white">
                  <h2 className="text-2xl sm:text-4xl font-bold drop-shadow-lg">
                    Start Learning Today!
                  </h2>
                  <p className="text-md drop-shadow-lg">
                    Join thousands of students on their journey to success
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DemoClassSection;
