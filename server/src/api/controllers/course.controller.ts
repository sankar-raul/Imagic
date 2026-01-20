import { Request, Response } from "express";
import Course from "../../models/course/course.model";

export const createCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const courseData = req.body;
    // Generate unique slug from course title
      const generateSlug = (title: string): string => {
        return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
      };

      let slug = generateSlug(courseData.title);
      let slugExists = await Course.findOne({ slug });
      let counter = 1;
      
      while (slugExists) {
        slug = `${generateSlug(courseData.title)}-${counter}`;
        slugExists = await Course.findOne({ slug });
        counter++;
      }
      
      courseData.slug = slug;
    const newCourse = await Course.create(courseData);
    return res.status(201).json({ success: true, data: newCourse });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const viewCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { courseId } = req.params;
    const course = await Course.findOne({ slug: courseId });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res
      .status(200)
      .json({ message: "Course data fetch seccessfull", data: course });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const allCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const courses = await Course.find();
    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }
    return res.status(200).json({ data: courses });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { courseId } = req.params;
    const updateData = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({ success: true, data: updatedCourse });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { courseId } = req.params;
    await Course.findByIdAndDelete(courseId);
    return res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
