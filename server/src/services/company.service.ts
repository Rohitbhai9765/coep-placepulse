import Company from "../models/Company.model";

export const getAllCompanies = async () => {
  return await Company.find().sort({
    createdAt: -1,
  });
};

export const getCompanyById = async (id: string) => {
  return await Company.findById(id);
};

export const createCompanyService = async (data: any) => {
  return await Company.create(data);
};

export const updateCompanyService = async (
  id: string,
  data: any
) => {
  return await Company.findByIdAndUpdate(id, data, {
    new: true,
  });
};

export const deleteCompanyService = async (
  id: string
) => {
  return await Company.findByIdAndDelete(id);
};