export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "student";
  studentId?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}