import { Request, Response } from "express";

import { ApiResponse } from "../utils/ApiResponse";

import { getDashboardStatistics, getPackageDistribution } from "../services/statistics.service";

import { getPlacementStatus } from "../services/statistics.service";

import {
  getBranchStatistics,
} from "../services/statistics.service";
export const packageDistribution = async (
  _: Request,
  res: Response
) => {
  try {
    const data =
      await getPackageDistribution();

    res.json(
      new ApiResponse(
        true,
        "Package distribution fetched",
        data
      )
    );
  } catch {
    res.status(500).json(
      new ApiResponse(
        false,
        "Unable to fetch package distribution"
      )
    );
  }
};

export const placementStatus = async (
  _: Request,
  res: Response
) => {
  try {

    const data =
      await getPlacementStatus();

    res.json(
      new ApiResponse(
        true,
        "Placement status fetched",
        data
      )
    );

  } catch {

    res.status(500).json(
      new ApiResponse(
        false,
        "Unable to fetch placement status"
      )
    );

  }
};

export const dashboardStatistics = async (
  _: Request,
  res: Response
) => {
  try {
    const data =
      await getDashboardStatistics();

    res.json(
      new ApiResponse(
        true,
        "Statistics fetched successfully",
        data
      )
    );
  } catch (error) {
    console.error(error);

    res.status(500).json(
      new ApiResponse(
        false,
        "Unable to fetch statistics"
      )
    );
  }
};


export const branchStatistics = async (
  _: Request,
  res: Response
) => {
  try {

    const data =
      await getBranchStatistics();

    res.json(
      new ApiResponse(
        true,
        "Branch statistics fetched successfully",
        data
      )
    );

  } catch {

    res.status(500).json(
      new ApiResponse(
        false,
        "Unable to fetch branch statistics"
      )
    );

  }
};