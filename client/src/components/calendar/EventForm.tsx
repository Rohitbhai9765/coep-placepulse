import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Event } from "@/types/event";

import {
  createEvent,
  updateEvent,
} from "@/services/eventApi";

interface Props {
  event?: Event;
}

const EventForm = ({ event }: Props) => {
  const navigate = useNavigate();

  const isEdit = !!event;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    company: "",
    title: "",
    date: "",
    venue: "",
    round: "",
    status: "Upcoming",
  });

  useEffect(() => {
    if (event) {
      setForm({
        company: event.company,
        title: event.title,
        date: event.date.split("T")[0],
        venue: event.venue,
        round: event.round,
        status: event.status,
      });
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload: Event = {
        _id: event?._id,
        company: form.company,
        title: form.title,
        date: form.date,
        venue: form.venue,
        round: form.round,
        status: form.status as
          | "Upcoming"
          | "Completed"
          | "Cancelled",
      };

      if (isEdit && event?._id) {

        await updateEvent(event._id, payload);

        alert("✅ Event Updated");

      } else {

        await createEvent(payload);

        alert("✅ Event Added");

      }

      navigate("/admin/calendar");

    } catch (error) {

      console.error(error);

      alert("Something went wrong.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-zinc-800 bg-[#18181B] p-4 sm:p-6 lg:p-8"
    >
      <div className="grid gap-6 md:grid-cols-2">

        <input
          name="company"
          placeholder="Company"
          value={form.company}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

        <input
          name="venue"
          placeholder="Venue"
          value={form.venue}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

        <input
          name="round"
          placeholder="Round"
          value={form.round}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        >
          <option>Upcoming</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 min-h-11 w-full rounded-xl bg-violet-600 py-3 text-lg font-semibold"
      >
        {loading
          ? isEdit
            ? "Updating..."
            : "Saving..."
          : isEdit
          ? "Update Event"
          : "Save Event"}
      </button>

    </form>
  );
};

export default EventForm;
