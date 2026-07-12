import jwt from "jsonwebtoken";

export const generateToken = (
  id: string,
  role: string,
  studentId?: string
) => {
  return jwt.sign(
    {
      id,
      role,
      studentId,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};