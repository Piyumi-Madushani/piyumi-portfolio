import { Router } from "express";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getExperiences);

router.post("/", protect, createExperience);
router.put("/:id", protect, updateExperience);
router.delete("/:id", protect, deleteExperience);

export default router;