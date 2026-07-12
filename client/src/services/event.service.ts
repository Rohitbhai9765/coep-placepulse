const API_BASE = '/api/events';

// GET ALL
export const getAllEvents = async () => {
  const res = await fetch(`${API_BASE}`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
};

// GET ONE
export const getEventById = async (id: string) => {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch event');
  return res.json();
};

// CREATE
export const createEventService = async (data: any) => {
  const res = await fetch(`${API_BASE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create event');
  return res.json();
};

// UPDATE
export const updateEventService = async (id: string, data: any) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update event');
  return res.json();
};

// DELETE
export const deleteEventService = async (id: string) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete event');
  return res.json();
};