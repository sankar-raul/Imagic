import { Router } from "express";
import { postBlog, getBlogDetails, getAllBlogs, updateBlog, deleteBlog } from "../controllers/blog.controller";

const router = Router();

router.post("/", postBlog);
router.get("/:blogId", getBlogDetails);
router.get("/", getAllBlogs);
router.put("/:blogId", updateBlog);
router.delete("/:blogId", deleteBlog);

export default router