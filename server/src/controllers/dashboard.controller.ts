import { Request, Response } from "express";

import {
  getDashboardService,
  updateDashboardService,
} from "../services/dashboard.service";

import { ApiResponse } from "../utils/ApiResponse";

// ============================
// GET DASHBOARD
// ============================

export const getDashboard = async (
  _: Request,
  res: Response
) => {

  try {

    const dashboard =
      await getDashboardService();

    return res.json(
      new ApiResponse(
        true,
        "Dashboard fetched successfully",
        dashboard
      )
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json(
      new ApiResponse(
        false,
        "Unable to fetch dashboard"
      )
    );

  }

};

// ============================
// UPDATE DASHBOARD
// ============================

export const updateDashboard = async (
  req: Request,
  res: Response
) => {

  try {

    const dashboard =
      await updateDashboardService(
        req.body
      );

    return res.json(
      new ApiResponse(
        true,
        "Dashboard updated successfully",
        dashboard
      )
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json(
      new ApiResponse(
        false,
        "Unable to update dashboard"
      )
    );

  }

};