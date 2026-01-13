export interface Icourse{
    title: string;
    slug: string;
    short_description: string;
    courseDetails: IcourseDetails;
    course_overview: string;
    courseSyllabus: ISyllabusSection[];
    students_work: IstudentWork[];
    reviews: IcourseReview[];
    students_testimonials: IcourseTestimonial[];
    
}
export interface IcourseTestimonial{
    name: string;
    designation: string;
    testimonial: string;
    image: string;
    video?: string;
}

export interface IcourseReview{
    name: string;
    rating: number;
    comment: string;
    date: Date;
}

export interface IstudentWork{
    tool: string;
    name: string;
    description: string;
    image: string;
}


// course details
export interface IcourseDetails{
    price: number;
    image: string;
    category: string;
    start_on: Date;
    duration: string;
    eligibility: string;
    branch: string;
}

// syllabus
export interface ISyllabusSection {
  title: string;
  description: string;
}