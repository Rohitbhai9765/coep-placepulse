import { Router } from "express";

import {
  getDashboardHome,
} from "../controllers/dashboardHome.controller";

const router = Router();

router.get(
  "/",
  getDashboardHome
);

export default router;