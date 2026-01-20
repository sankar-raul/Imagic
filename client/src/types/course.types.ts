export interface Icourse{
    _id?: string;
    title: string;
    slug: string;
    short_description: string;
    courseDetails: IcourseDetails;
    course_overview: string;
    courseSyllabus: ISyllabusSection[];
    reviews: IcourseReview[];
    
}


export interface IcourseReview{
    name: string;
    rating: number;
    comment: string;
    date: Date;
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