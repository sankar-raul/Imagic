import { Router } from "express";
import {
  addcomment,
  deleteComment,
  getCommentsByBlogId,
  likeComment,
} from "../controllers/comment.controller";

const router = Router();

router.post("/:blogId", addcomment);
router.get("/blog/:blogId", getCommentsByBlogId);
router.delete("/:comment_id", deleteComment);
router.post("/:comment_id/like", likeComment);
export default router;
