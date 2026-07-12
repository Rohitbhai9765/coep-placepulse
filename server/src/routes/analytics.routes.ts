import { Router } from "express";

import {

  getAnalytics,

  updateAnalytics,

} from "../controllers/analytics.controller";

import { protect } from "../middleware/auth.middleware";

import { adminOnly } from "../middleware/role.middleware";

const router = Router();

// ============================
// PUBLIC
// ============================

router.get(
  "/",
  getAnalytics
);

// ============================
// ADMIN
// ============================

router.put(
  "/",
  protect,
  adminOnly,
  updateAnalytics
);

export default router;