const { Router } = require("express");
import { requestOtp, verifyOtp } from "../controllers/otp.controller";
const router = Router();

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
export default router;
