import { Router } from "express";

import {
  getDashboard,
  updateDashboard,
} from "../controllers/dashboard.controller";

import { protect } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/role.middleware";

const router = Router();

/* ===========================
   Dashboard
=========================== */

// Public
router.get(
  "/",
  getDashboard
);

// Admin Only
router.put(
  "/",
  protect,
  adminOnly,
  updateDashboard
);

export default router;