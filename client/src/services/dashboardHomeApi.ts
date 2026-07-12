import api from "./api";

export const getDashboardHome =
  async () => {

    const response =
      await api.get(
        "/dashboard/home"
      );

    return response.data.data;

};