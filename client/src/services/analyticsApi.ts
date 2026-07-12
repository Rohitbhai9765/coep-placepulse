import api from "./api";

import type {
  Analytics,
} from "@/types/analytics";

// ============================
// GET ANALYTICS
// ============================

export const getAnalytics =
  async (): Promise<Analytics> => {

    const response =
      await api.get("/analytics");

    return response.data.data;

};

// ============================
// UPDATE ANALYTICS
// ============================

export const updateAnalytics =
  async (
    analytics: Analytics
  ): Promise<Analytics> => {

    const response =
      await api.put(
        "/analytics",
        analytics
      );

    return response.data.data;

};