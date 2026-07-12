import api from "./api";

import type { DashboardStatistics } from "@/types/statistics";

import type { BranchStatistics } from "@/types/branchStatistics";

export const getBranchStatistics =
  async (): Promise<
    BranchStatistics[]
  > => {

    const response =
      await api.get(
        "/statistics/branches"
      );

    return response.data.data;
};

export const getDashboardStatistics =
  async (): Promise<DashboardStatistics> => {

    const response =
      await api.get("/statistics/dashboard");

    return response.data.data;
};


export const getPackageDistribution =
  async () => {
    const response =
      await api.get("/statistics/packages");

    return response.data.data;
  };


export const getPlacementStatus =
  async () => {

    const response =
      await api.get(
        "/statistics/placement-status"
      );

    return response.data.data;

};