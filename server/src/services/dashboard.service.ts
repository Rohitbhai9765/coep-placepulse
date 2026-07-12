import Dashboard from "../models/Dashboard.model";

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

      studentsPlaced: 286,

      studentsPlacedChange: "+12 Today",

      companiesVisited: 63,

      companiesVisitedChange: "+2 This Week",

      highestPackage: "52 LPA",

      highestPackageLabel: "Highest",

      averagePackage: "14.8 LPA",

      averagePackageChange: "+1.4 LPA",

    });

  }

  return dashboard;

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