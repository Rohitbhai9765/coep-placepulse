import { Schema, model, Types } from "mongoose";

const applicationSchema = new Schema(
  {
    studentId: {
      type: Types.ObjectId,
      ref: "Student",
      required: true,
    },

    companyId: {
      type: Types.ObjectId,
      ref: "Company",
      required: true,
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    currentStage: {
      type: String,
      enum: [
        "Applied",
        "Online Assessment",
        "Technical Interview",
        "HR Interview",
        "Offer",
      ],
      default: "Applied",
    },

    status: {
      type: String,
      enum: [
        "In Progress",
        "Selected",
        "Rejected",
        "Withdrawn",
      ],
      default: "In Progress",
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Application", applicationSchema);