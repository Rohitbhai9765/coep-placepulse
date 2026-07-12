import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  rollNo: string;
  email: string;
  phone: string;

  branch: string;

  cgpa: number;

  backlogs: number;

  passingYear: number;

  placementStatus:
    | "Placed"
    | "Unplaced"
    | "Higher Studies"
    | "Entrepreneur";

  placedCompany: string;

  package: number;

  linkedin: string;

  github: string;

  // New Fields

  skills: string[];

  preferredRole: string;

  preferredLocation: string;

  resumeUrl: string;

  applications: mongoose.Types.ObjectId[];
}

const StudentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
    },

    rollNo: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    // ✅ Changed: CGPA is now optional
    cgpa: {
      type: Number,
      default: 0,
    },

    backlogs: {
      type: Number,
      default: 0,
    },

    passingYear: {
      type: Number,
      default: 2027,
    },

    placementStatus: {
      type: String,
      enum: [
        "Placed",
        "Unplaced",
        "Higher Studies",
        "Entrepreneur",
      ],
      default: "Unplaced",
    },

    placedCompany: {
      type: String,
      default: "",
    },

    package: {
      type: Number,
      default: 0,
    },

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    // New Fields

    skills: {
      type: [String],
      default: [],
    },

    preferredRole: {
      type: String,
      default: "",
    },

    preferredLocation: {
      type: String,
      default: "",
    },

    resumeUrl: {
      type: String,
      default: "",
    },

    applications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Company",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStudent>(
  "Student",
  StudentSchema
);