import { Router } from "express";
import {
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getBlogDetails,
  postBlog,
  updateBlog,
} from "../controllers/blog.controller";
import adminAuth from "../middlewares/adminAuth";

const router = Router();

router.post("/", adminAuth, postBlog);
router.get("/:blogId", getBlogDetails);
router.get("/id/:blogId", getBlogById);
router.get("/", getAllBlogs);
router.put("/:blogId", adminAuth, updateBlog);
router.delete("/:blogId", adminAuth, deleteBlog);

export default router;
