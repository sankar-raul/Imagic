import { useState, useEffect } from "react";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import DynamicForm from "../../../shared/form/DynamicForm";
import RichTextEditor from "../../../shared/RichTextEditor";
import {
  basicInfoFields,
  courseDetailsFields,
  syllabusFields,
  reviewFields,
} from "../../../../constants/forms/courseFormFields";
import {
  Icourse,
  ISyllabusSection,
  IcourseReview,
  IcourseDetails,
} from "@/types/course.types";
import useUpdateCourse from "@/hooks/course/useUpdateCourse";
import useGetCourseById from "@/hooks/course/useGetCourseById";

type SectionKey = "basic" | "details" | "syllabus" | "reviews";

interface SectionHeaderProps {
  title: string;
  section: SectionKey;
}

export default function EditCourse() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { courseData, isLoading: loadingCourse } = useGetCourseById(slug);
  const { updateCourse, isLoading: updating } = useUpdateCourse();

  const [expandedSections, setExpandedSections] = useState<
    Record<SectionKey, boolean>
  >({
    basic: true,
    details: true,
    syllabus: false,
    reviews: false,
  });

  interface BasicInfo {
    title: string;
    slug: string;
    short_description: string;
  }

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    title: "",
    slug: "",
    short_description: "",
  });
  const [overview, setOverview] = useState("");
  const [courseDetails, setCourseDetails] = useState<IcourseDetails>(
    {} as IcourseDetails,
  );
  const [syllabusModules, setSyllabusModules] = useState<ISyllabusSection[]>(
    [],
  );
  const [reviews, setReviews] = useState<IcourseReview[]>([]);

  // Temporary state for adding new items
  const [currentSyllabus, setCurrentSyllabus] = useState<
    Partial<ISyllabusSection>
  >({});
  const [currentReview, setCurrentReview] = useState<Partial<IcourseReview>>(
    {},
  );

  // Load course data when available
  useEffect(() => {
    if (courseData) {
      setBasicInfo({
        title: courseData.title || "",
        slug: courseData.slug || "",
        short_description: courseData.short_description || "",
      });
      setOverview(courseData.course_overview || "");

      // Convert date to yyyy-MM-dd format for HTML date input
      const courseDetailsWithFormattedDate = {
        ...courseData.courseDetails,
        start_on: courseData.courseDetails?.start_on
          ? new Date(courseData.courseDetails.start_on)
              .toISOString()
              .split("T")[0]
          : "",
      };

      setCourseDetails(courseDetailsWithFormattedDate as any);
      setSyllabusModules(courseData.courseSyllabus || []);

      // Format review dates if they exist
      const formattedReviews = (courseData.reviews || []).map((review) => ({
        ...review,
        date: review.date
          ? new Date(review.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      }));

      setReviews(formattedReviews as any);
    }
  }, [courseData]);

  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmit = async () => {
    if (!slug) {
      alert("Course slug is missing");
      return;
    }

    const updatedCourseData: Icourse = {
      title: basicInfo.title,
      slug: basicInfo.slug,
      short_description: basicInfo.short_description,
      courseDetails: courseDetails,
      course_overview: overview,
      courseSyllabus: syllabusModules,
      reviews: reviews,
    };

    try {
      await updateCourse(courseData?._id!, updatedCourseData);
      alert("Course updated successfully!");
      navigate("/dashboard/course");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course. Please try again.");
    }
  };

  const handleFieldChange = (section: string) => (name: string, value: any) => {
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      if (parent === "courseDetails") {
        setCourseDetails((prev) => ({ ...prev, [child]: value }));
      }
    } else {
      switch (section) {
        case "basic":
          setBasicInfo((prev) => ({ ...prev, [name]: value }));
          break;
        case "details":
          setCourseDetails((prev) => ({ ...prev, [name]: value }));
          break;
        case "syllabus":
          setCurrentSyllabus((prev) => ({ ...prev, [name]: value }));
          break;
        case "review":
          setCurrentReview((prev) => ({ ...prev, [name]: value }));
          break;
      }
    }
  };

  const addModule = () => {
    if (currentSyllabus.title && currentSyllabus.description) {
      setSyllabusModules((prev) => [
        ...prev,
        currentSyllabus as ISyllabusSection,
      ]);
      setCurrentSyllabus({});
    }
  };

  const removeModule = (index: number) => {
    setSyllabusModules((prev) => prev.filter((_, i) => i !== index));
  };

  const addReview = () => {
    if (currentReview.name && currentReview.rating) {
      setReviews((prev) => [...prev, currentReview as IcourseReview]);
      setCurrentReview({});
    }
  };

  const removeReview = (index: number) => {
    setReviews((prev) => prev.filter((_, i) => i !== index));
  };

  const SectionHeader = ({ title, section }: SectionHeaderProps) => (
    <div
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between p-4 bg-blue-300/10 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
    >
      <h2 className="text-lg font-normal text-gray-800">{title}</h2>
      {expandedSections[section] ? (
        <ChevronUp className="text-gray-600" />
      ) : (
        <ChevronDown className="text-gray-600" />
      )}
    </div>
  );

  if (loadingCourse) {
    return (
      <div className="min-h-screen p-6 w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="min-h-screen p-6 w-full">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Course Not Found
            </h3>
            <p className="text-gray-600 mb-4">
              The course you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/dashboard/course")}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="w-full">
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Course
            </h1>
            <p className="text-gray-600">Update course details</p>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <SectionHeader title="Basic Information" section="basic" />
              {expandedSections.basic && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <DynamicForm
                      fields={basicInfoFields.filter(
                        (f) => f.name !== "course_overview",
                      )}
                      values={basicInfo}
                      onChange={handleFieldChange("basic")}
                    />
                  </div>

                  <RichTextEditor
                    value={overview}
                    onChange={setOverview}
                    label="Course Overview"
                  />
                </div>
              )}
            </div>

            {/* Course Details */}
            <div className="space-y-4">
              <SectionHeader title="Course Details" section="details" />
              {expandedSections.details && (
                <div className="p-4 bg-gray-50 rounded-lg space-y-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="text-md font-semibold text-gray-800 mb-4">
                      Basic Course Information
                    </h3>
                    <DynamicForm
                      fields={courseDetailsFields}
                      values={courseDetails}
                      onChange={handleFieldChange("details")}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Course Syllabus */}
            <div className="space-y-4">
              <SectionHeader title="Course Syllabus" section="syllabus" />
              {expandedSections.syllabus && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  {syllabusModules.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h3 className="font-medium text-gray-700">
                        Added Modules: {syllabusModules.length}
                      </h3>
                      {syllabusModules.map((module, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded border border-gray-200 flex justify-between items-start"
                        >
                          <div>
                            <p className="font-medium">{module.title}</p>
                            <p className="text-sm text-gray-600">
                              {module.description}
                            </p>
                          </div>
                          <button
                            onClick={() => removeModule(index)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <DynamicForm
                      fields={syllabusFields[0].fields || []}
                      values={currentSyllabus}
                      onChange={handleFieldChange("syllabus")}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addModule}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                  >
                    <Plus size={18} />
                    Add Module
                  </button>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="space-y-4">
              <SectionHeader title="Reviews" section="reviews" />
              {expandedSections.reviews && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  {reviews.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h3 className="font-medium text-gray-700">
                        Added Reviews: {reviews.length}
                      </h3>
                      {reviews.map((review, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded border border-gray-200 flex justify-between items-start"
                        >
                          <div>
                            <p className="font-medium">
                              {review.name} - {review.rating}★
                            </p>
                            <p className="text-sm text-gray-600">
                              {review.comment}
                            </p>
                          </div>
                          <button
                            onClick={() => removeReview(index)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <DynamicForm
                      fields={reviewFields[0].fields || []}
                      values={currentReview}
                      onChange={handleFieldChange("review")}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addReview}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                  >
                    <Plus size={18} />
                    Add Review
                  </button>
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                disabled={updating}
                className="flex-1 px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Update Course"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard/course")}
                disabled={updating}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
