import Event from "../../../server/src/models/Event.model";

// GET ALL
export const getAllEvents = async () => {
  return await Event.find().sort({
    date: 1,
  });
};

// GET ONE
export const getEventById = async (id: string) => {
  return await Event.findById(id);
};

// CREATE
export const createEventService = async (data: any) => {
  return await Event.create(data);
};

// UPDATE
export const updateEventService = async (
  id: string,
  data: any
) => {
  return await Event.findByIdAndUpdate(id, data, {
    new: true,
  });
};

// DELETE
export const deleteEventService = async (id: string) => {
  return await Event.findByIdAndDelete(id);
};