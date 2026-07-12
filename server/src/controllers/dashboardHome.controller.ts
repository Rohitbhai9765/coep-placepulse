import { Request, Response } from "express";

import Dashboard from "../models/Dashboard.model";
import Announcement from "../models/Announcement.model";
import Event from "../models/Event.model";
import Company from "../models/Company.model";
import Analytics from "../models/Analytics.model";

import { ApiResponse } from "../utils/ApiResponse";

export const getDashboardHome = async (
  _: Request,
  res: Response
) => {

  try {

    const [

      dashboard,

      announcements,

      events,

      companies,

      analytics,

    ] = await Promise.all([

      Dashboard.findOne(),

      Announcement.find()
        .sort({ createdAt: -1 })
        .limit(5),

      Event.find()
        .sort({ date: 1 })
        .limit(5),

      Company.find()
        .sort({ createdAt: -1 })
        .limit(5),

      Analytics.findOne(),

    ]);

    res.json(

      new ApiResponse(

        true,

        "Dashboard Home",

        {

          dashboard,

          announcements,

          events,

          companies,

          analytics,

        }

      )

    );

  } catch {

    res.status(500).json(

      new ApiResponse(

        false,

        "Unable to load dashboard"

      )

    );

  }

};