import api from "./api";
import type { Announcement } from "@/types/announcement";

// GET ALL
export const getAnnouncements = async (): Promise<Announcement[]> => {
  const response = await api.get("/announcements");
  return response.data.data;
};

// GET ONE
export const getAnnouncement = async (
  id: string
): Promise<Announcement> => {
  const response = await api.get(`/announcements/${id}`);
  return response.data.data;
};

// CREATE
export const createAnnouncement = async (
  announcement: Announcement
): Promise<Announcement> => {
  const response = await api.post(
    "/announcements",
    announcement
  );

  return response.data.data;
};

// UPDATE
export const updateAnnouncement = async (
  id: string,
  announcement: Partial<Announcement>
): Promise<Announcement> => {
  const response = await api.put(
    `/announcements/${id}`,
    announcement
  );

  return response.data.data;
};

// DELETE
export const deleteAnnouncement = async (
  id: string
): Promise<void> => {
  await api.delete(`/announcements/${id}`);
};

