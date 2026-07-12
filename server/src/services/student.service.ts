import Student from "../models/Student.model";

// ============================
// GET ALL
// ============================

export const getAllStudents = async () => {
  return await Student.find().sort({
    createdAt: -1,
  });
};

// ============================
// GET ONE
// ============================

export const getStudentById = async (
  id: string
) => {
  return await Student.findById(id);
};

// ============================
// CREATE
// ============================

export const createStudentService = async (
  data: any
) => {
  return await Student.create(data);
};

// ============================
// UPDATE (ADMIN)
// ============================

export const updateStudentService = async (
  id: string,
  data: any
) => {
  return await Student.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

// ============================
// DELETE
// ============================

export const deleteStudentService = async (
  id: string
) => {
  return await Student.findByIdAndDelete(id);
};

// ============================
// GET PROFILE (STUDENT)
// ============================

export const getMyProfileService = async (
  studentId: string
) => {
  return await Student.findById(studentId);
};

// ============================
// UPDATE PROFILE (STUDENT)
// ============================

export const updateMyProfileService = async (
  studentId: string,
  data: any
) => {
  // Only these fields are editable by students
  const allowedFields = {
    phone: data.phone,
    cgpa: data.cgpa,
    backlogs: data.backlogs,
    skills: data.skills,
    linkedin: data.linkedin,
    github: data.github,
    preferredRole: data.preferredRole,
    preferredLocation: data.preferredLocation,
  };

  return await Student.findByIdAndUpdate(
    studentId,
    allowedFields,
    {
      new: true,
      runValidators: true,
    }
  );
};