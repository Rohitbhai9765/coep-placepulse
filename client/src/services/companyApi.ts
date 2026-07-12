import api from "./api";
import type { Company } from "@/types/company";

// GET ALL
export const getCompanies = async (): Promise<Company[]> => {
  const response = await api.get("/companies");
  return response.data.data;
};

// GET ONE
export const getCompany = async (id: string): Promise<Company> => {
  const response = await api.get(`/companies/${id}`);
  return response.data.data;
};

// CREATE
export const createCompany = async (
  company: Company
): Promise<Company> => {
  const response = await api.post("/companies", company);
  return response.data.data;
};

// UPDATE
export const updateCompany = async (
  id: string,
  company: Partial<Company>
): Promise<Company> => {
  const response = await api.put(`/companies/${id}`, company);
  return response.data.data;
};

// DELETE
export const deleteCompany = async (
  id: string
): Promise<void> => {
  await api.delete(`/companies/${id}`);
};