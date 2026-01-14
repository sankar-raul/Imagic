import { Router } from "express";
import {
  deleteNews,
  getAllNews,
  getSingleNews,
  postNews,
  updateNews,
} from "../controllers/news.controller";
import adminAuth from "../middlewares/adminAuth";

const router = Router();

router.post("/", adminAuth, postNews);
router.get("/", getAllNews);
router.get("/:newsId", getSingleNews);
router.delete("/:newsId", adminAuth, deleteNews);
router.put("/:newsId", adminAuth, updateNews);

export default router;
