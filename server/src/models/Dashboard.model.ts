import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IDashboard
  extends Document {

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

const DashboardSchema =
  new Schema<IDashboard>(
    {

      title: {
        type: String,
        required: true,
      },

      subtitle: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      studentsPlaced: {
        type: Number,
        default: 0,
      },

      studentsPlacedChange: {
        type: String,
        default: "+12 Today",
      },

      companiesVisited: {
        type: Number,
        default: 0,
      },

      companiesVisitedChange: {
        type: String,
        default: "+2 This Week",
      },

      highestPackage: {
        type: String,
        default: "0 LPA",
      },

      highestPackageLabel: {
        type: String,
        default: "Highest",
      },

      averagePackage: {
        type: String,
        default: "0 LPA",
      },

      averagePackageChange: {
        type: String,
        default: "+1.4 LPA",
      },

    },
    {
      timestamps: true,
    }
  );

export default mongoose.model<IDashboard>(
  "Dashboard",
  DashboardSchema
);