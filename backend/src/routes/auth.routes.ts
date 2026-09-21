import { Router } from "express";
import { loginAdmin } from "../controllers/auth.controller.js";
import { loginRateLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();

router.post("/login", loginRateLimiter, loginAdmin);

export default router;