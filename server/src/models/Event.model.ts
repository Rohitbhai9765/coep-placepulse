import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    round: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Upcoming",
        "Completed",
        "Cancelled",
      ],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Event", eventSchema);