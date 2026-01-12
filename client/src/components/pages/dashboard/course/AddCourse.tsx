import { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import DynamicForm from '../../../shared/form/DynamicForm';
import {
  basicInfoFields,
  courseDetailsFields,
  syllabusFields,
  studentWorkFields,
  reviewFields,
  testimonialFields
} from '../../../../constants/forms/courseFormFields';

type SectionKey =
  | 'basic'
  | 'details'
  | 'syllabus'
  | 'work'
  | 'reviews'
  | 'testimonials';

interface SectionHeaderProps {
  title: string;
  section: SectionKey;
}

export default function CourseForm() {
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    details: true,
    syllabus: false,
    work: false,
    reviews: false,
    testimonials: false
  });

  // Form state management
  const [basicInfo, setBasicInfo] = useState({});
  const [courseDetails, setCourseDetails] = useState({});
  const [syllabusModules, setSyllabusModules] = useState<any[]>([]);
  const [studentWorks, setStudentWorks] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Temporary state for adding new items
  const [currentSyllabus, setCurrentSyllabus] = useState({});
  const [currentWork, setCurrentWork] = useState({});
  const [currentReview, setCurrentReview] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState({});

  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSubmit = () => {
    const courseData = {
      ...basicInfo,
      ...courseDetails,
      syllabus: syllabusModules,
      studentWork: studentWorks,
      reviews,
      testimonials
    };
    console.log('Course created:', courseData);
  };

  const handleFieldChange = (section: string) => (name: string, value: any) => {
    switch (section) {
      case 'basic':
        setBasicInfo(prev => ({ ...prev, [name]: value }));
        break;
      case 'details':
        setCourseDetails(prev => ({ ...prev, [name]: value }));
        break;
      case 'syllabus':
        setCurrentSyllabus(prev => ({ ...prev, [name]: value }));
        break;
      case 'work':
        setCurrentWork(prev => ({ ...prev, [name]: value }));
        break;
      case 'review':
        setCurrentReview(prev => ({ ...prev, [name]: value }));
        break;
      case 'testimonial':
        setCurrentTestimonial(prev => ({ ...prev, [name]: value }));
        break;
    }
  };

  const addModule = () => {
    setSyllabusModules(prev => [...prev, currentSyllabus]);
    setCurrentSyllabus({});
  };

  const addStudentWork = () => {
    setStudentWorks(prev => [...prev, currentWork]);
    setCurrentWork({});
  };

  const addReview = () => {
    setReviews(prev => [...prev, currentReview]);
    setCurrentReview({});
  };

  const addTestimonial = () => {
    setTestimonials(prev => [...prev, currentTestimonial]);
    setCurrentTestimonial({});
  };

  const SectionHeader = ({ title, section }: SectionHeaderProps) => (
    <div 
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between p-4 bg-blue-300/10 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
    >
      <h2 className="text-lg font-normal text-gray-800">{title}</h2>
      {expandedSections[section] ? <ChevronUp className="text-gray-600" /> : <ChevronDown className="text-gray-600" />}
    </div>
  );

  return (
    <div className="min-h-screen p-6 w-full">
      <div className="w-full">
        <div className="w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
            <p className="text-gray-600">Fill in the details to add a new course to the platform</p>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <SectionHeader title="Basic Information" section="basic" />
              {expandedSections.basic && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <DynamicForm
                    fields={basicInfoFields}
                    values={basicInfo}
                    onChange={handleFieldChange('basic')}
                  />
                </div>
              )}
            </div>

            {/* Course Details */}
            <div className="space-y-4">
              <SectionHeader title="Course Details" section="details" />
              {expandedSections.details && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DynamicForm
                      fields={courseDetailsFields}
                      values={courseDetails}
                      onChange={handleFieldChange('details')}
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
                      <h3 className="font-medium text-gray-700">Added Modules: {syllabusModules.length}</h3>
                      {syllabusModules.map((module, index) => (
                        <div key={index} className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{module.moduleTitle}</p>
                          <p className="text-sm text-gray-600">{module.moduleDescription}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <DynamicForm
                      fields={syllabusFields}
                      values={currentSyllabus}
                      onChange={handleFieldChange('syllabus')}
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

            {/* Students Work */}
            <div className="space-y-4">
              <SectionHeader title="Students Work" section="work" />
              {expandedSections.work && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  {studentWorks.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h3 className="font-medium text-gray-700">Added Works: {studentWorks.length}</h3>
                      {studentWorks.map((work, index) => (
                        <div key={index} className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{work.studentName} - {work.tool}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DynamicForm
                        fields={studentWorkFields}
                        values={currentWork}
                        onChange={handleFieldChange('work')}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addStudentWork}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                  >
                    <Plus size={18} />
                    Add Student Work
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
                      <h3 className="font-medium text-gray-700">Added Reviews: {reviews.length}</h3>
                      {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{review.reviewerName} - {review.rating}★</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DynamicForm
                        fields={reviewFields}
                        values={currentReview}
                        onChange={handleFieldChange('review')}
                      />
                    </div>
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

            {/* Testimonials */}
            <div className="space-y-4">
              <SectionHeader title="Student Testimonials" section="testimonials" />
              {expandedSections.testimonials && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  {testimonials.length > 0 && (
                    <div className="space-y-2 mb-4">
                      <h3 className="font-medium text-gray-700">Added Testimonials: {testimonials.length}</h3>
                      {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-white p-3 rounded border border-gray-200">
                          <p className="font-medium">{testimonial.studentName}</p>
                          <p className="text-sm text-gray-600">{testimonial.designation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DynamicForm
                        fields={testimonialFields}
                        values={currentTestimonial}
                        onChange={handleFieldChange('testimonial')}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addTestimonial}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
                  >
                    <Plus size={18} />
                    Add Testimonial
                  </button>
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg"
              >
                Create Course
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold"
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