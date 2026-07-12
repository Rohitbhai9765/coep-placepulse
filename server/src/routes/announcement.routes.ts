import { Router } from "express";

import {
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controllers/announcement.controller";

import { protect } from "../middleware/auth.middleware";

import { adminOnly } from "../middleware/role.middleware";

const router = Router();

router.get("/", getAnnouncements);

router.get("/:id", getAnnouncement);

router.post("/", protect, adminOnly, createAnnouncement);

router.put("/:id", protect, adminOnly, updateAnnouncement);

router.delete("/:id", protect, adminOnly, deleteAnnouncement);

export default router;