import { Router } from "express";
import multer from "multer";

import {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getMyProfile,
  updateMyProfile,
} from "../controllers/student.controller";

import { importStudents } from "../controllers/studentImport.controller";

import { protect } from "../middleware/auth.middleware";
import { adminOnly } from "../middleware/role.middleware";

const router = Router();

console.log("✅ student.routes.ts loaded");

/* ===========================
   Multer Configuration
=========================== */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${file.originalname}`
    );
  },
});

const upload = multer({
  storage,
});


router.get("/hello", (req, res) => {
  res.json({
    success: true,
    message: "Student Router Working",
  });
});

/* ===========================
   Student Profile
=========================== */

// Logged-in Student Profile
router.get(
  "/profile",
  protect,
  getMyProfile
);

router.put(
  "/profile",
  protect,
  updateMyProfile
);

/* ===========================
   Import Students
=========================== */

router.post(
  "/import",
  protect,
  adminOnly,
  upload.single("file"),
  importStudents
);

/* ===========================
   Student CRUD (Admin)
=========================== */

router.get("/", getStudents);

router.get("/:id", getStudent);

router.post(
  "/",
  protect,
  adminOnly,
  createStudent
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateStudent
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteStudent
);

export default router;