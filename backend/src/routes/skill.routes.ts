import { Router } from "express";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getSkills);

router.post("/", protect, createSkill);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

export default router;