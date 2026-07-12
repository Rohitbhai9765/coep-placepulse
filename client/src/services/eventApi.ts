import api from "./api";
import type { Event } from "@/types/event";

// GET ALL
export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get("/events");
  return response.data.data;
};

// GET ONE
export const getEvent = async (
  id: string
): Promise<Event> => {
  const response = await api.get(`/events/${id}`);
  return response.data.data;
};

// CREATE
export const createEvent = async (
  event: Event
): Promise<Event> => {
  const response = await api.post("/events", event);
  return response.data.data;
};

// UPDATE
export const updateEvent = async (
  id: string,
  event: Partial<Event>
): Promise<Event> => {
  const response = await api.put(`/events/${id}`, event);
  return response.data.data;
};

// DELETE
export const deleteEvent = async (
  id: string
): Promise<void> => {
  await api.delete(`/events/${id}`);
};