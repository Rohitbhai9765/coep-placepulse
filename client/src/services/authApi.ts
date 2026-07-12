import api from "./api";

import type { LoginResponse } from "@/types/auth";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {

  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return response.data.data;
};