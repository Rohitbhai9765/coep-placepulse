import Student from "../models/Student.model";
import Company from "../models/Company.model";
import Event from "../models/Event.model";

// ============================
// GET ANALYTICS
// ============================

export const getAnalyticsService = async () => {

  const trendAggregation = await Student.aggregate([
    { $match: { placementStatus: "Placed" } },
    {
      $group: {
        _id: { $month: "$updatedAt" },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  let cumulativePlaced = 0;
  const placementTrend = trendAggregation.map((t) => {
    cumulativePlaced += t.count;
    return {
      month: monthNames[t._id - 1] || "Unknown",
      placed: cumulativePlaced
    };
  });

  if (placementTrend.length === 0) {
    placementTrend.push({ month: monthNames[new Date().getMonth()], placed: 0 });
  }

  const activeCompanies = await Company.countDocuments({ status: "Ongoing" });
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const interviewsToday = await Event.countDocuments({
    date: { $gte: today, $lt: tomorrow }
  });

  const offersReleased = await Student.countDocuments({ placementStatus: "Placed" });
  const pendingResults = await Event.countDocuments({ status: "Upcoming" });
  const score = Math.min(100, Math.max(10, (activeCompanies * 10) + (interviewsToday * 20)));

  return {
    placementTrend,
    placementPulse: {
      activeCompanies,
      interviewsToday,
      offersReleased,
      pendingResults,
      score,
      status: score > 50 ? "High Activity" : "Normal Activity",
      change: "+0%",
      updated: "Just Now"
    }
  };

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