import { Request, Response } from "express";
import review from "../../models/reviews/review.model";


export const addReview = async (req : Request, res: Response) => {
  try {
    const reviewData = req.body;
    const newReview = await review.create(reviewData);
    res.status(201).json({data: newReview});
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getReviewsByCourseId = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const reviews = await review.find({ courseId });
    res.status(200).json({ data: reviews });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};