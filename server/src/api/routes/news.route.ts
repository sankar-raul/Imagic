import { Router } from "express";
import { postNews, getAllNews, getSingleNews, deleteNews, updateNews } from "../controllers/news.controller";

const router = Router();

router.post("/", postNews);
router.get("/", getAllNews);
router.get("/:newsId", getSingleNews);
router.delete("/:newsId", deleteNews);
router.put("/:newsId", updateNews);

export default router