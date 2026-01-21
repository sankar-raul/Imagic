import { Request, Response } from "express";
import testimonial from "../../models/testimonial/testimonial.model";

export const addTestimonial = async (req: Request, res: Response) => {
  try {
    const testimonialData = req.body;
    const testimonialDetails = await testimonial.create(testimonialData);
    res.status(201).json(testimonialDetails);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllTestimonials = async (req: Request, res: Response) => {
  try {
    const numberOfTestimonials = Math.min(
      parseInt(req.query.limit as string) || 5,
      20,
    );
    const testimonials = await testimonial.find().limit(numberOfTestimonials);
    const totalTestimonials = await testimonial.countDocuments();
    if (testimonials.length === 0) {
      return res.status(404).json({ message: "No testimonials found" });
    }
    res.status(200).json({ testimonials, totalTestimonials });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getTestimonialById = async (req: Request, res: Response) => {
  try {
    const { testimonialId } = req.params;
    const testimonialDetails = await testimonial.findById(testimonialId);
    if (!testimonialDetails) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json(testimonialDetails);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getTestimonialByCourseId = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const testimonials = await testimonial.find({ courseName: courseId });
    res.status(200).json({ data: testimonials });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateTestimonial = async (req: Request, res: Response) => {
  try {
    const { testimonialId } = req.params;
    const updateData = req.body;
    const updatedTestimonial = await testimonial.findByIdAndUpdate(
      testimonialId,
      updateData,
      { new: true },
    );
    res.status(200).json({ data: updatedTestimonial });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  try {
    const { testimonialId } = req.params;
    await testimonial.findByIdAndDelete(testimonialId);
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
