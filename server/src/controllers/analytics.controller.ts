import { Request, Response } from "express";

import {
  getAnalyticsService,
  updateAnalyticsService,
} from "../services/analytics.service";

import { ApiResponse } from "../utils/ApiResponse";

// ============================
// GET ANALYTICS
// ============================

export const getAnalytics = async (
  _: Request,
  res: Response
) => {

  try {

    const analytics =
      await getAnalyticsService();

    res.json(

      new ApiResponse(

        true,

        "Analytics fetched successfully",

        analytics

      )

    );

  } catch {

    res.status(500).json(

      new ApiResponse(

        false,

        "Unable to fetch analytics"

      )

    );

  }

};

// ============================
// UPDATE ANALYTICS
// ============================

export const updateAnalytics = async (
  req: Request,
  res: Response
) => {

  try {

    const analytics =
      await updateAnalyticsService(
        req.body
      );

    res.json(

      new ApiResponse(

        true,

        "Analytics updated successfully",

        analytics

      )

    );

  } catch {

    res.status(400).json(

      new ApiResponse(

        false,

        "Unable to update analytics"

      )

    );

  }

};