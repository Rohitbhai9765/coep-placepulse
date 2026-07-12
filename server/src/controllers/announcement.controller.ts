import { Request, Response } from "express";

import {
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncementService,
  updateAnnouncementService,
  deleteAnnouncementService,
} from "../services/announcement.service";

import { ApiResponse } from "../utils/ApiResponse";

// GET ALL
export const getAnnouncements = async (
  _: Request,
  res: Response
) => {
  try {
    const announcements = await getAllAnnouncements();

    res.json(
      new ApiResponse(
        true,
        "Announcements fetched successfully",
        announcements
      )
    );
  } catch {
    res.status(500).json(
      new ApiResponse(
        false,
        "Unable to fetch announcements"
      )
    );
  }
};

// GET ONE
export const getAnnouncement = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const announcement =
      await getAnnouncementById(id);

    if (!announcement) {
      return res.status(404).json(
        new ApiResponse(
          false,
          "Announcement not found"
        )
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Announcement fetched successfully",
        announcement
      )
    );
  } catch {
    res.status(500).json(
      new ApiResponse(
        false,
        "Server Error"
      )
    );
  }
};

// CREATE
export const createAnnouncement = async (
  req: Request,
  res: Response
) => {
  try {
    const announcement =
      await createAnnouncementService(req.body);

    res.status(201).json(
      new ApiResponse(
        true,
        "Announcement created successfully",
        announcement
      )
    );
  } catch {
    res.status(400).json(
      new ApiResponse(
        false,
        "Unable to create announcement"
      )
    );
  }
};

// UPDATE
export const updateAnnouncement = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const announcement =
      await updateAnnouncementService(
        id,
        req.body
      );

    if (!announcement) {
      return res.status(404).json(
        new ApiResponse(
          false,
          "Announcement not found"
        )
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Announcement updated successfully",
        announcement
      )
    );
  } catch {
    res.status(400).json(
      new ApiResponse(
        false,
        "Update failed"
      )
    );
  }
};

// DELETE
export const deleteAnnouncement = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const announcement =
      await deleteAnnouncementService(id);

    if (!announcement) {
      return res.status(404).json(
        new ApiResponse(
          false,
          "Announcement not found"
        )
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Announcement deleted successfully"
      )
    );
  } catch {
    res.status(500).json(
      new ApiResponse(
        false,
        "Delete failed"
      )
    );
  }
};