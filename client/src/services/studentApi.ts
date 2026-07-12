import api from "./api";
import type { Student } from "@/types/student";

// ============================
// ADMIN APIs
// ============================

// GET ALL
export const getStudents = async (): Promise<Student[]> => {
  const response = await api.get("/students");
  return response.data.data;
};

// GET ONE
export const getStudent = async (
  id: string
): Promise<Student> => {
  const response = await api.get(`/students/${id}`);
  return response.data.data;
};

// CREATE
export const createStudent = async (
  student: Student
): Promise<Student> => {
  const response = await api.post(
    "/students",
    student
  );

  return response.data.data;
};

// UPDATE (ADMIN)
export const updateStudent = async (
  id: string,
  student: Partial<Student>
): Promise<Student> => {
  const response = await api.put(
    `/students/${id}`,
    student
  );

  return response.data.data;
};

// DELETE
export const deleteStudent = async (
  id: string
) => {
  await api.delete(`/students/${id}`);
};

// ============================
// STUDENT PROFILE APIs
// ============================

// Logged-in student's profile
export const getMyProfile = async (): Promise<Student> => {
  const response = await api.get(
    "/students/profile"
  );

  return response.data.data;
};

// Update logged-in student's profile
export const updateMyProfile = async (
  student: Partial<Student>
): Promise<Student> => {
  const response = await api.put(
    "/students/profile",
    student
  );

  return response.data.data;
};