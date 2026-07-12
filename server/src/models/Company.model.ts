import mongoose, { Schema } from "mongoose";

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    package: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    cgpa: {
      type: Number,
      required: true,
    },

    eligibleBranches: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },

    rounds: [
      {
        type: String,
      },
    ],

    website: String,

    applyLink: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", companySchema);