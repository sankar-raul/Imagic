import { useCallback, useEffect, useState } from "react";
import { Briefcase, MapPin, DollarSign, Clock, Building } from "lucide-react";
import { useParams } from "react-router";
import useGetJobBySlug from "@/hooks/jobVacancy/useGetJobBySlug";
import { motion } from "framer-motion";
import { JobPageSkeleton, JobNotFound } from "@/components/shared/skeletons";
import DemoClassSection from "./shared/demoClassSection/DemoClassSection";
import HtmlRenderer from "./shared/ui/HtmlRenderer";
import useCustomScroll from "@/hooks/global/useCustomScroll";

export default function JobListingPage() {
  const { slug } = useParams();
  const { loading, job, refetch } = useGetJobBySlug(slug || "");
  const { scrollToTop } = useCustomScroll();
  useEffect(() => {
    scrollToTop();
  }, [slug]);
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
  const formateDate = useCallback((dateStr: string | Date) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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

  if (loading) {
    return <JobPageSkeleton />;
  }

  if (!job) {
    return <JobNotFound />;
  }

  return (
    <div className="min-h-screen py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 100, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            rotate: { duration: 0.7 },
          }}
          viewport={{
            once: true,
          }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_max-content] gap-4 sm:gap-6"
        >
          {/* Main Content - Job Listing */}
          <div className="lg:col-span-2 py-12">
            {/* Job Header Card */}
            <div className="rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-1 w-full">
                  <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 text-neutral-500">
                    <span className="font-medium text-sm sm:text-base">
                      {job.company}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm sm:text-base">3.4</span>
                      <span className="text-sm sm:text-sm">
                        (41340 Reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-neutral-600 text-sm sm:text-base">
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
                <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-neutral-600">
                  <div className="flex items-center gap-1">
                    <Clock size={14} className="sm:w-4 sm:h-4 shrink-0" />
                    <span>Posted: {formateDate(job.posted_date)}</span>
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
            <div className="bg-white rounded-lg p-4 sm:p-6">
              <HtmlRenderer content={job.jobDetails} />
            </div>
          </div>

          {/* Sidebar - Demo Class Form */}
          <div className="lg:col-span-1">
            <DemoClassSection minimal />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
