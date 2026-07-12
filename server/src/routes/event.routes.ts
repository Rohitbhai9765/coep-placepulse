import { Router } from "express";

import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller";

import { protect } from "../middleware/auth.middleware";

import { adminOnly } from "../middleware/role.middleware";

const router = Router();

router.get("/", getEvents);

router.get("/:id", getEvent);

router.post("/", protect, adminOnly, createEvent);

router.put("/:id", protect, adminOnly, updateEvent);

router.delete("/:id", protect, adminOnly, deleteEvent);

export default router;