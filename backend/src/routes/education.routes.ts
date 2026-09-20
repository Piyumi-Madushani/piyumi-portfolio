import { Router } from "express";
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/education.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getEducations);

router.post("/", protect, createEducation);
router.put("/:id", protect, updateEducation);
router.delete("/:id", protect, deleteEducation);

export default router;