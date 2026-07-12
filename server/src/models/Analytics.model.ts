import mongoose, {
  Schema,
  Document,
} from "mongoose";

export interface IPlacementTrend {

  month: string;

  placed: number;

}

export interface IPlacementPulse {

  activeCompanies: number;

  interviewsToday: number;

  offersReleased: number;

  pendingResults: number;

  score: number;

  status: string;

  change: string;

  updated: string;

}

export interface IAnalytics
  extends Document {

  placementTrend: IPlacementTrend[];

  placementPulse: IPlacementPulse;

}

const AnalyticsSchema =
  new Schema<IAnalytics>(
    {

      placementTrend: [

        {

          month: {

            type: String,

            required: true,

          },

          placed: {

            type: Number,

            required: true,

          },

        },

      ],

      placementPulse: {

        activeCompanies: {

          type: Number,

          default: 18,

        },

        interviewsToday: {

          type: Number,

          default: 11,

        },

        offersReleased: {

          type: Number,

          default: 6,

        },

        pendingResults: {

          type: Number,

          default: 7,

        },

        score: {

          type: Number,

          default: 82,

        },

        status: {

          type: String,

          default: "High Activity",

        },

        change: {

          type: String,

          default: "+8%",

        },

        updated: {

          type: String,

          default: "Just Now",

        },

      },

    },

    {

      timestamps: true,

    }

  );

export default mongoose.model<IAnalytics>(
  "Analytics",
  AnalyticsSchema
);