import { Router } from "express";
import { addcomment, getCommentsByBlogId } from "../controllers/comment.controller";

const router = Router();

router.post("/", addcomment);
router.get("/blog/:blogId", getCommentsByBlogId);
export default router;