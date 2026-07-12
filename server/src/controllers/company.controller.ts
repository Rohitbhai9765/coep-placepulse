import { Request, Response } from "express";

import {
  getAllCompanies,
  getCompanyById,
  createCompanyService,
  updateCompanyService,
  deleteCompanyService,
} from "../services/company.service";

import { ApiResponse } from "../utils/ApiResponse";

// GET ALL
export const getCompanies = async (
  _: Request,
  res: Response
) => {
  try {
    const companies = await getAllCompanies();

    res.json(
      new ApiResponse(
        true,
        "Companies fetched successfully",
        companies
      )
    );
  } catch {
    res.status(500).json(
      new ApiResponse(false, "Unable to fetch companies")
    );
  }
};

// GET ONE
export const getCompany = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const company = await getCompanyById(id);

    if (!company) {
      return res
        .status(404)
        .json(new ApiResponse(false, "Company not found"));
    }

    res.json(
      new ApiResponse(
        true,
        "Company fetched successfully",
        company
      )
    );
  } catch {
    res
      .status(500)
      .json(new ApiResponse(false, "Server Error"));
  }
};

// CREATE
export const createCompany = async (
  req: Request,
  res: Response
) => {
  try {
    const company = await createCompanyService(req.body);

    res.status(201).json(
      new ApiResponse(
        true,
        "Company created successfully",
        company
      )
    );
  } catch {
    res
      .status(400)
      .json(new ApiResponse(false, "Unable to create company"));
  }
};

// UPDATE
export const updateCompany = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const company = await updateCompanyService(id, req.body);

    if (!company) {
      return res
        .status(404)
        .json(new ApiResponse(false, "Company not found"));
    }

    res.json(
      new ApiResponse(
        true,
        "Company updated successfully",
        company
      )
    );
  } catch {
    res
      .status(400)
      .json(new ApiResponse(false, "Update failed"));
  }
};

// DELETE
export const deleteCompany = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const company = await deleteCompanyService(id);

    if (!company) {
      return res
        .status(404)
        .json(new ApiResponse(false, "Company not found"));
    }

    res.json(
      new ApiResponse(
        true,
        "Company deleted successfully"
      )
    );
  } catch {
    res
      .status(500)
      .json(new ApiResponse(false, "Delete failed"));
  }
};