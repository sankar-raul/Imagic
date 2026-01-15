import { useState } from "react";
import { Briefcase, MapPin, DollarSign, Clock, Building } from "lucide-react";
import data from "../assets/jobs.json";
import { useParams } from "react-router";

export default function JobListingPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    course: "Professional FCP Video Editing & VFX Course",
  });
  const [captcha, setCaptcha] = useState("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    phoneNumber?: string;
    email?: string;
    captcha?: string;
  }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: {
      fullName?: string;
      phoneNumber?: string;
      email?: string;
      captcha?: string;
    } = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "The field is required.";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "The field is required.";
    if (!formData.email.trim()) newErrors.email = "The field is required.";
    if (captcha !== "11") newErrors.captcha = "Incorrect answer.";
    return newErrors;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Form submitted successfully!");
      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        course: "Professional FCP Video Editing & VFX Course",
      });
      setCaptcha("");
      setErrors({});
    }
  };

  const { vacancyId } = useParams();
  const numericJobId = vacancyId ? parseInt(vacancyId, 10) : undefined;
  const job = data.find((job) => job.id === numericJobId);
  console.log(job);

  if (!job) {
    return (
      <div className="min-h-screen my-20 bg-gray-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900">Job not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen my-20 bg-gray-50 py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content - Job Listing */}
          <div className="lg:col-span-2">
            {/* Job Header Card */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-1 w-full">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                    <span className="text-gray-700 font-medium text-sm sm:text-base">
                      {job.company}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-gray-700 text-sm sm:text-base">
                        3.4
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        41340 Reviews
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-gray-600 text-sm sm:text-base">
                    <div className="flex items-center gap-2">
                      <Briefcase size={16} className="sm:w-5 sm:h-5 shrink-0" />
                      <span>6 - 11 years</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign
                        size={16}
                        className="sm:w-5 sm:h-5 shrink-0"
                      />
                      <span>Not Disclosed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building size={16} className="sm:w-5 sm:h-5 shrink-0" />
                      <span>{job.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="sm:w-5 sm:h-5 shrink-0" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 border-t border-gray-200 gap-4">
                <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="sm:w-4 sm:h-4 shrink-0" />
                    <span>Posted: {job.date}</span>
                  </div>
                  {/* <div className="flex items-center gap-1">
                    <Users size={14} className="sm:w-4 sm:h-4 shrink-0" />
                    <span>Openings: 10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} className="sm:w-4 sm:h-4 shrink-0" />
                    <span>Applicants: 100+</span>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Job Description Card */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              {job.details.map((point, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold text-black my-6 border-l-4 border-black pl-3">
                    {point.title}
                  </h2>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    {point.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Demo Class Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center border-b-2 border-gray-900 pb-2 sm:pb-3">
                Apply for Demo Class
              </h2>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter Your Name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  {errors.fullName && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Your Phone Number"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Your Email Id"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                    Your Course
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm sm:text-base"
                  >
                    <option>Professional FCP Video Editing & VFX Course</option>
                    <option>React JS Development Course</option>
                    <option>Full Stack Development Course</option>
                    <option>UI/UX Design Course</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-900 font-semibold mb-2 text-sm sm:text-base">
                    What is your answer 3 + 8
                  </label>
                  <input
                    type="text"
                    value={captcha}
                    onChange={(e) => {
                      setCaptcha(e.target.value);
                      if (errors.captcha) {
                        setErrors((prev) => ({ ...prev, captcha: "" }));
                      }
                    }}
                    placeholder="enter answer"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                  {errors.captcha && (
                    <p className="text-red-600 text-xs sm:text-sm mt-1">
                      {errors.captcha}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200 text-sm sm:text-base"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
