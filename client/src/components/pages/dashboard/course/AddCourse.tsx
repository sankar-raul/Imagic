import { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import DynamicForm from '../../../shared/form/DynamicForm';
import RichTextEditor from '../../../shared/RichTextEditor';
import {
  basicInfoFields,
  courseDetailsFields,
  syllabusFields,
  studentWorkFields,
  reviewFields,
  testimonialFields
} from '../../../../constants/forms/courseFormFields';
import { Icourse, ISyllabusSection, IcourseReview, IcourseDetails, IcourseTestimonial, IstudentWork } from '@/types/course.types';
import useCreateCourse from '@/hooks/course/useCreateCourse';


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
  interface BasicInfo {
    title: string;
    slug: string;
    short_description: string;
  }

  const [basicInfo, setBasicInfo] = useState<BasicInfo>({
    title: '',
    slug: '',
    short_description: ''
  });
  const [overview, setOverview] = useState('');

  const [courseDetails, setCourseDetails] = useState<IcourseDetails>({} as IcourseDetails);
  const [syllabusModules, setSyllabusModules] = useState<ISyllabusSection[]>([]);
  const [studentWorks, setStudentWorks] = useState<IstudentWork[]>([]);
  const [reviews, setReviews] = useState<IcourseReview[]>([]);
  const [testimonials, setTestimonials] = useState<IcourseTestimonial[]>([]);

  // Temporary state for adding new items
  const [currentSyllabus, setCurrentSyllabus] = useState<Partial<ISyllabusSection>>({});
  const [currentWork, setCurrentWork] = useState<Partial<IstudentWork>>({});
  const [currentReview, setCurrentReview] = useState<Partial<IcourseReview>>({});
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<IcourseTestimonial>>({});

  const { createCourse, isLoading } = useCreateCourse();

  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSubmit = () => {
    const courseData: Icourse = {
      title: basicInfo.title,
      slug: basicInfo.slug,
      short_description: basicInfo.short_description,
      courseDetails: courseDetails,
      course_overview: overview,
      courseSyllabus: syllabusModules,
      students_work: studentWorks,
      reviews: reviews,
      students_testimonials: testimonials,
    };
    console.log('Course created:', courseData);
    createCourse(courseData)
      .then(response => {
        console.log('Course successfully created:', response);
      })
      .catch(error => {
        console.error('Error creating course:', error);
      });
  };

  const handleFieldChange = (section: string) => (name: string, value: any) => {
    // Handle nested field names (e.g., 'courseDetails.price')
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'courseDetails') {
        setCourseDetails(prev => ({ ...prev, [child]: value }));
      }
    } else {
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
        case 'review':
          setCurrentReview(prev => ({ ...prev, [name]: value }));
          break;
        case 'work':
          setCurrentWork(prev => ({ ...prev, [name]: value }));
          break;
        case 'testimonial':
          setCurrentTestimonial(prev => ({ ...prev, [name]: value }));
          break;
      }
    }
  };

  const addModule = () => {
    if (currentSyllabus.title && currentSyllabus.description) {
      setSyllabusModules(prev => [...prev, currentSyllabus as ISyllabusSection]);
      setCurrentSyllabus({});
    }
  };

  const addStudentWork = () => {
    if (currentWork.name && currentWork.tool) {
      setStudentWorks(prev => [...prev, currentWork as IstudentWork]);
      setCurrentWork({});
    }
  };

  const addReview = () => {
    if (currentReview.name && currentReview.rating) {
      setReviews(prev => [...prev, currentReview as IcourseReview]);
      setCurrentReview({});
    }
  };

  const addTestimonial = () => {
    if (currentTestimonial.name && currentTestimonial.designation) {
      setTestimonials(prev => [...prev, currentTestimonial as IcourseTestimonial]);
      setCurrentTestimonial({});
    }
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
                <div className="p-4 bg-gray-50 rounded-lg space-y-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <DynamicForm
                      fields={basicInfoFields.filter(f => f.name !== 'course_overview')}
                      values={basicInfo}
                      onChange={handleFieldChange('basic')}
                    />
                  </div>
                  
                  {/* Rich text editor for course overview */}
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
                    <h3 className="text-md font-semibold text-gray-800 mb-4">Basic Course Information</h3>
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
                          <p className="font-medium">{module.title}</p>
                          <p className="text-sm text-gray-600">{module.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <DynamicForm
                      fields={syllabusFields[0].fields || []}
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
                          <p className="font-medium">{work.name} - {work.tool}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <DynamicForm
                      fields={studentWorkFields[0].fields || []}
                      values={currentWork}
                      onChange={handleFieldChange('work')}
                    />
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
                          <p className="font-medium">{review.name} - {review.rating}★</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <DynamicForm
                      fields={reviewFields[0].fields || []}
                      values={currentReview}
                      onChange={handleFieldChange('review')}
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
                          <p className="font-medium">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.designation}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <DynamicForm
                      fields={testimonialFields[0].fields || []}
                      values={currentTestimonial}
                      onChange={handleFieldChange('testimonial')}
                    />
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
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition font-semibold shadow-lg"
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