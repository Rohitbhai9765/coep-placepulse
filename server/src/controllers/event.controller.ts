import { Request, Response } from "express";

import {
  getAllEvents,
  getEventById,
  createEventService,
  updateEventService,
  deleteEventService,
} from "../services/event.service";

import { ApiResponse } from "../utils/ApiResponse";

// GET ALL
export const getEvents = async (
  _: Request,
  res: Response
) => {
  try {
    const events = await getAllEvents();

    res.json(
      new ApiResponse(
        true,
        "Events fetched successfully",
        events
      )
    );
  } catch {
    res.status(500).json(
      new ApiResponse(
        false,
        "Unable to fetch events"
      )
    );
  }
};

// GET ONE
export const getEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const event = await getEventById(id);

    if (!event) {
      return res.status(404).json(
        new ApiResponse(false, "Event not found")
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Event fetched successfully",
        event
      )
    );
  } catch {
    res.status(500).json(
      new ApiResponse(false, "Server Error")
    );
  }
};

// CREATE
export const createEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await createEventService(req.body);

    res.status(201).json(
      new ApiResponse(
        true,
        "Event created successfully",
        event
      )
    );
  } catch {
    res.status(400).json(
      new ApiResponse(
        false,
        "Unable to create event"
      )
    );
  }
};

// UPDATE
export const updateEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const event = await updateEventService(
      id,
      req.body
    );

    if (!event) {
      return res.status(404).json(
        new ApiResponse(false, "Event not found")
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Event updated successfully",
        event
      )
    );
  } catch {
    res.status(400).json(
      new ApiResponse(false, "Update failed")
    );
  }
};

// DELETE
export const deleteEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    const event = await deleteEventService(id);

    if (!event) {
      return res.status(404).json(
        new ApiResponse(false, "Event not found")
      );
    }

    res.json(
      new ApiResponse(
        true,
        "Event deleted successfully"
      )
    );
  } catch {
    res.status(500).json(
      new ApiResponse(false, "Delete failed")
    );
  }
};