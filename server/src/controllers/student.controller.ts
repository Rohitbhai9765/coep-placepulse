import { Request, Response } from "express";

import {
  getAllStudents,
  getStudentById,
  createStudentService,
  updateStudentService,
  deleteStudentService,
  getMyProfileService,
  updateMyProfileService,
} from "../services/student.service";

import { ApiResponse } from "../utils/ApiResponse";

// ============================
// GET ALL
// ============================

export const getStudents = async (
  _: Request,
  res: Response
) => {
  try {
    const students = await getAllStudents();

    res.json(
      new ApiResponse(
        true,
        "Students fetched successfully",
        students
      )
    );
  } catch {
    res.status(500).json(
      new ApiResponse(
        false,
        "Unable to fetch students"
      )
    );
  }
};

// ============================
// GET ONE
// ============================

export const getStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const student =
      await getStudentById(id);

    if (!student) {
      return res.status(404).json(
        new ApiResponse(
          false,
          "Student not found"
        )
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Student fetched successfully",
        student
      )
    );
  } catch {
    res.status(500).json(
      new ApiResponse(
        false,
        "Server Error"
      )
    );
  }
};

// ============================
// CREATE
// ============================

export const createStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const student =
      await createStudentService(req.body);

    res.status(201).json(
      new ApiResponse(
        true,
        "Student created successfully",
        student
      )
    );
  } catch {
    res.status(400).json(
      new ApiResponse(
        false,
        "Unable to create student"
      )
    );
  }
};

// ============================
// UPDATE (ADMIN)
// ============================

export const updateStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const student =
      await updateStudentService(
        id,
        req.body
      );

    if (!student) {
      return res.status(404).json(
        new ApiResponse(
          false,
          "Student not found"
        )
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Student updated successfully",
        student
      )
    );
  } catch {
    res.status(400).json(
      new ApiResponse(
        false,
        "Update failed"
      )
    );
  }
};

// ============================
// DELETE
// ============================

export const deleteStudent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const student =
      await deleteStudentService(id);

    if (!student) {
      return res.status(404).json(
        new ApiResponse(
          false,
          "Student not found"
        )
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Student deleted successfully"
      )
    );
  } catch {
    res.status(500).json(
      new ApiResponse(
        false,
        "Delete failed"
      )
    );
  }
};

// ============================
// GET MY PROFILE
// ============================

export const getMyProfile = async (
  req: any,
  res: Response
) => {

  console.log("\n============================");
  console.log("🔥 GET MY PROFILE");
  console.log("============================");

  console.log("Decoded JWT:");
  console.log(req.user);

  try {

    const student = await getMyProfileService(
      req.user.studentId
    );

    console.log("\nStudent Found:");
    console.log(student);

    if (!student) {

      console.log("❌ Student Not Found");

      return res.status(404).json(
        new ApiResponse(
          false,
          "Profile not found"
        )
      );

    }

    console.log("✅ Profile Sent Successfully");

    return res.json(
      new ApiResponse(
        true,
        "Profile fetched successfully",
        student
      )
    );

  } catch (error) {

    console.log("\n❌ GET PROFILE ERROR");

    console.error(error);

    return res.status(500).json(
      new ApiResponse(
        false,
        "Unable to fetch profile"
      )
    );

  }

};

// ============================
// UPDATE MY PROFILE
// ============================

export const updateMyProfile = async (
  req: any,
  res: Response
) => {
  try {

    const student =
      await updateMyProfileService(
        req.user.studentId,
        req.body
      );

    if (!student) {
      return res.status(404).json(
        new ApiResponse(
          false,
          "Profile not found"
        )
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Profile updated successfully",
        student
      )
    );

  } catch (error) {

    console.error("UPDATE PROFILE ERROR:");
    console.error(error);

    res.status(400).json(
      new ApiResponse(
        false,
        "Unable to update profile"
      )
    );

  }
};