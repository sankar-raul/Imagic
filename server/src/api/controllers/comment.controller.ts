import { Request, Response } from "express";
import comment from "../../models/blog/comment.model";

export const addcomment = async (req: Request, res: Response) => {
  try {
    const commentData = req.body;
    const commentDetails = await comment.create(commentData);
    res.status(201).json(commentDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCommentsByBlogId = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const comments = await comment.find({ blogId });
    res.status(200).json({data: comments});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};