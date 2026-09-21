import { Router } from "express";

import {
  createContact,
  getContacts,
  deleteContact,
  markContactAsRead,
} from "../controllers/contact.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { contactRateLimiter } from "../middleware/rate-limit.middleware.js";

const router = Router();

router.post("/", contactRateLimiter, createContact);

router.get("/", protect, getContacts);

router.patch("/:id/read", protect, markContactAsRead);

router.delete("/:id", protect, deleteContact);

export default router;