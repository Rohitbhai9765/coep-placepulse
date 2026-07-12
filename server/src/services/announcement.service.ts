import Announcement from "../models/Announcement.model";

// GET ALL
export const getAllAnnouncements = async () => {
  return await Announcement.find().sort({
    createdAt: -1,
  });
};

// GET ONE
export const getAnnouncementById = async (
  id: string
) => {
  return await Announcement.findById(id);
};

// CREATE
export const createAnnouncementService = async (
  data: any
) => {
  return await Announcement.create(data);
};

// UPDATE
export const updateAnnouncementService = async (
  id: string,
  data: any
) => {
  return await Announcement.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
    }
  );
};

// DELETE
export const deleteAnnouncementService = async (
  id: string
) => {
  return await Announcement.findByIdAndDelete(id);
};