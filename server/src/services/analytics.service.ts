import Analytics from "../models/Analytics.model";

// ============================
// GET ANALYTICS
// ============================

export const getAnalyticsService = async () => {

  let analytics = await Analytics.findOne();

  if (!analytics) {

    analytics = await Analytics.create({

      placementTrend: [

        {
          month: "Aug",
          placed: 18,
        },

        {
          month: "Sep",
          placed: 42,
        },

        {
          month: "Oct",
          placed: 71,
        },

        {
          month: "Nov",
          placed: 126,
        },

        {
          month: "Dec",
          placed: 188,
        },

        {
          month: "Jan",
          placed: 247,
        },

        {
          month: "Feb",
          placed: 286,
        },

      ],

      placementPulse: {

  activeCompanies: 18,

  interviewsToday: 11,

  offersReleased: 6,

  pendingResults: 7,

  score: 82,

  status: "High Activity",

  change: "+8%",

  updated: "Just Now",

},

    });

  }

  return analytics;

};

// ============================
// UPDATE ANALYTICS
// ============================

export const updateAnalyticsService = async (
  data: any
) => {

  let analytics = await Analytics.findOne();

  if (!analytics) {

    analytics = await Analytics.create(data);

  } else {

    analytics.placementTrend =
      data.placementTrend;

    analytics.placementPulse =
      data.placementPulse;

    await analytics.save();

  }

  return analytics;

};