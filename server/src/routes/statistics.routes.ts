import { Router } from "express";

import {
  dashboardStatistics,
  branchStatistics,
  packageDistribution,
  placementStatus,
} from "../controllers/statistics.controller";

const router = Router();

router.get("/dashboard", dashboardStatistics);

router.get(
  "/branches",
  branchStatistics
);

router.get(
  "/packages",
  packageDistribution
);

router.get(
  "/placement-status",
  placementStatus
);

export default router;