import { Router } from "express";
import {
  deleteSubscriber,
  getAllSubscribers,
  subscribeNewsletter,
  unsubscribeNewsletter,
} from "../controllers/newsletter.controller";
import adminAuth from "../middlewares/adminAuth";

const router = Router();

router.post("/subscribe", subscribeNewsletter);
router.post("/unsubscribe", unsubscribeNewsletter);
router.get("/", adminAuth, getAllSubscribers);
router.delete("/:subscriberId", adminAuth, deleteSubscriber);

export default router;
