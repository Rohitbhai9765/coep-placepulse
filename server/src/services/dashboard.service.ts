import Dashboard from "../models/Dashboard.model";
import { getDashboardStatistics } from "./statistics.service";

// ============================
// GET DASHBOARD
// ============================

export const getDashboardService = async () => {

  let dashboard = await Dashboard.findOne();

  if (!dashboard) {

    dashboard = await Dashboard.create({

      title: "Welcome to COEP PlacePulse",

      subtitle: "Training & Placement Cell",

      description:
        "Empowering students with opportunities and connecting them with leading recruiters.",
    });

  }

  const dynamicStats = await getDashboardStatistics();

  return {
    ...dashboard.toObject(),
    studentsPlaced: dynamicStats.placedStudents,
    studentsPlacedChange: "+0 Today", // Could be computed dynamically in the future
    companiesVisited: dynamicStats.companies,
    companiesVisitedChange: "+0 This Week",
    highestPackage: `${dynamicStats.highestPackage} LPA`,
    highestPackageLabel: "Highest",
    averagePackage: `${dynamicStats.averagePackage} LPA`,
    averagePackageChange: "+0.0 LPA",
  };

};

// ============================
// UPDATE DASHBOARD
// ============================

export const updateDashboardService = async (
  data: any
) => {

  let dashboard = await Dashboard.findOne();

  if (!dashboard) {

    dashboard = await Dashboard.create(data);

  } else {

    dashboard.title = data.title;

    dashboard.subtitle = data.subtitle;

    dashboard.description = data.description;

    dashboard.studentsPlaced =
      data.studentsPlaced;

    dashboard.studentsPlacedChange =
      data.studentsPlacedChange;

    dashboard.companiesVisited =
      data.companiesVisited;

    dashboard.companiesVisitedChange =
      data.companiesVisitedChange;

    dashboard.highestPackage =
      data.highestPackage;

    dashboard.highestPackageLabel =
      data.highestPackageLabel;

    dashboard.averagePackage =
      data.averagePackage;

    dashboard.averagePackageChange =
      data.averagePackageChange;

    await dashboard.save();

  }

  return dashboard;

};