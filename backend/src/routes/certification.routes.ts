import { Router } from "express";
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "../controllers/certification.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getCertifications);

router.post("/", protect, createCertification);
router.put("/:id", protect, updateCertification);
router.delete("/:id", protect, deleteCertification);

export default router;