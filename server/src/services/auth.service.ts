import bcrypt from "bcryptjs";

import User from "../models/User.model";

import { generateToken } from "../utils/jwt";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "admin" | "student";
  studentId?: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerService = async (
  data: RegisterData
) => {

  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role || "student",
    studentId: data.studentId,
  });

  const token = generateToken(
  user._id.toString(),
  user.role,
  user.studentId?.toString()
);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const loginService = async (
  data: LoginData
) => {

  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(
    data.password,
    user.password
  );

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(
  user._id.toString(),
  user.role,
  user.studentId?.toString()
);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      studentId: user.studentId
    },
  };
};