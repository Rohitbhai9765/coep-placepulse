import Student from "../models/Student.model";
import Company from "../models/Company.model";
import Event from "../models/Event.model";
import Announcement from "../models/Announcement.model";

export const getDashboardStatistics = async () => {
  const totalStudents = await Student.countDocuments();

  const placedStudents = await Student.countDocuments({
    placementStatus: "Placed",
  });

  const companies = await Company.countDocuments();

  const events = await Event.countDocuments();

  const announcements = await Announcement.countDocuments();

  const highestPackageStudent = await Student.findOne()
    .sort({ package: -1 })
    .select("package");

  const averagePackageResult = await Student.aggregate([
    {
      $match: {
        placementStatus: "Placed",
      },
    },
    {
      $group: {
        _id: null,
        averagePackage: {
          $avg: "$package",
        },
      },
    },
  ]);

  const highestPackage =
    highestPackageStudent?.package || 0;

  const averagePackage =
    averagePackageResult.length > 0
      ? Number(
          averagePackageResult[0].averagePackage.toFixed(2)
        )
      : 0;

  const placementPercentage =
    totalStudents === 0
      ? 0
      : Number(
          (
            (placedStudents / totalStudents) *
            100
          ).toFixed(2)
        );

  return {
    totalStudents,
    placedStudents,
    placementPercentage,
    companies,
    announcements,
    events,
    highestPackage,
    averagePackage,
  };
};



export const getBranchStatistics = async () => {
  const data = await Student.aggregate([
    {
      $group: {
        _id: "$branch",

        totalStudents: {
          $sum: 1,
        },

        placedStudents: {
          $sum: {
            $cond: [
              {
                $eq: [
                  "$placementStatus",
                  "Placed",
                ],
              },
              1,
              0,
            ],
          },
        },

        highestPackage: {
          $max: "$package",
        },

        averagePackage: {
          $avg: "$package",
        },

        companiesPlacedIn: {
          $addToSet: {
            $cond: [
              { $and: [
                { $eq: ["$placementStatus", "Placed"] },
                { $ne: ["$placedCompany", ""] }
              ]},
              "$placedCompany",
              null
            ]
          }
        }
      },
    },

    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  return data.map((branch) => {
    // Remove null from the companies array
    const companies = branch.companiesPlacedIn.filter((c: any) => c !== null);

    return {
      branch: branch._id,

      totalStudents: branch.totalStudents,

      placedStudents: branch.placedStudents,

      placementPercentage:
        branch.totalStudents === 0
          ? 0
          : Number(
              (
                (branch.placedStudents /
                  branch.totalStudents) *
                100
              ).toFixed(2)
            ),

      highestPackage: branch.highestPackage,

      averagePackage: Number(
        (branch.averagePackage || 0).toFixed(2)
      ),

      companiesPlacedIn: companies,
    };
  });
};

export const getPackageDistribution = async () => {
  const students = await Student.find({
    placementStatus: "Placed",
  });

  return [
    {
      range: "0-5",
      count: students.filter(
        (s) => s.package >= 0 && s.package < 5
      ).length,
    },
    {
      range: "5-10",
      count: students.filter(
        (s) => s.package >= 5 && s.package < 10
      ).length,
    },
    {
      range: "10-20",
      count: students.filter(
        (s) => s.package >= 10 && s.package < 20
      ).length,
    },
    {
      range: "20+",
      count: students.filter(
        (s) => s.package >= 20
      ).length,
    },
  ];
};

export const getPlacementStatus = async () => {
  const placed = await Student.countDocuments({
    placementStatus: "Placed",
  });

  const unplaced = await Student.countDocuments({
    placementStatus: "Unplaced",
  });

  const higherStudies = await Student.countDocuments({
    placementStatus: "Higher Studies",
  });

  const entrepreneur = await Student.countDocuments({
    placementStatus: "Entrepreneur",
  });

  return [
    { name: "Placed", value: placed },
    { name: "Unplaced", value: unplaced },
    { name: "Higher Studies", value: higherStudies },
    { name: "Entrepreneur", value: entrepreneur },
  ];
};