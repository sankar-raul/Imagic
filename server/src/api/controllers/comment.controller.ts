import { Request, Response } from "express";
import comment from "../../models/blog/comment.model";

export const addcomment = async (req: Request, res: Response) => {
  try {
    const commentData = req.body;
    const { blogId } = req.params;
    commentData.blogId = blogId;
    const commentDetails = await comment.create(commentData);
    res.status(201).json({ data: commentDetails });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const likeComment = async (req: Request, res: Response) => {
  try {
    const { comment_id } = req.params;
    const { action } = req.body as { action: "like" | "dislike" };
    const actionValue = {
      like: 1,
      dislike: -1,
    };
    if (!actionValue[action]) {
      return res.status(400).json({ message: "Invalid action" });
    }
    const updatedComment = await comment.findByIdAndUpdate(
      comment_id,
      { $inc: { likes: actionValue[action] } },
      { new: true },
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ data: updatedComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { comment_id } = req.params;
    const deletedComment = await comment.findByIdAndDelete(comment_id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getCommentsByBlogId = async (req: Request, res: Response) => {
  try {
    const { blogId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
      comment
        .find({ blogId })
        .sort({ commentedAt: -1 })
        .skip(skip)
        .limit(limit),
      comment.countDocuments({ blogId }),
    ]);

    res.status(200).json({
      data: comments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalComments: total,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
