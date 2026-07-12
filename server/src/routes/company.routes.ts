import { Router } from "express";

import {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controller";

import { protect } from "../middleware/auth.middleware";

import { adminOnly } from "../middleware/role.middleware";

const router = Router();

router.get("/", getCompanies);

router.get("/:id", getCompany);

router.post(
"/",
protect,
adminOnly,
createCompany
);

router.put("/:id",protect,
adminOnly, updateCompany);

router.delete("/:id", protect, adminOnly, deleteCompany);

export default router;