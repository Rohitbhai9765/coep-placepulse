import api from "./api";

export interface Dashboard {

  _id?: string;

  title: string;

  subtitle: string;

  description: string;

  studentsPlaced: number;

  studentsPlacedChange: string;

  companiesVisited: number;

  companiesVisitedChange: string;

  highestPackage: string;

  highestPackageLabel: string;

  averagePackage: string;

  averagePackageChange: string;

}

// ============================
// GET DASHBOARD
// ============================

export const getDashboard =
  async (): Promise<Dashboard> => {

    const response =
      await api.get("/dashboard");

    return response.data.data;

};

// ============================
// UPDATE DASHBOARD
// ============================

export const updateDashboard =
  async (
    data: Dashboard
  ): Promise<Dashboard> => {

    const response =
      await api.put(
        "/dashboard",
        data
      );

    return response.data.data;

};