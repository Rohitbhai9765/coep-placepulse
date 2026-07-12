import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Announcement } from "@/types/announcement";

import {
  createAnnouncement,
  updateAnnouncement,
} from "@/services/announcementApi";

interface Props {
  announcement?: Announcement;
}

const AnnouncementForm = ({
  announcement,
}: Props) => {
  const navigate = useNavigate();

  const isEdit = !!announcement;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  useEffect(() => {
    if (announcement) {
      setForm({
        title: announcement.title,
        description: announcement.description,
        priority: announcement.priority,
      });
    }
  }, [announcement]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {

      const payload: Announcement = {
        _id: announcement?._id,
        title: form.title,
        description: form.description,
        priority: form.priority as
          | "Low"
          | "Medium"
          | "High",
      };

      if (isEdit && announcement?._id) {

        await updateAnnouncement(
          announcement._id,
          payload
        );

        alert("✅ Announcement Updated");

      } else {

        await createAnnouncement(payload);

        alert("✅ Announcement Added");

      }

      navigate("/admin/announcement-management");

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
      <div className="space-y-6">

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

        <textarea
          name="description"
          rows={5}
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="min-h-11 w-full rounded-xl bg-violet-600 py-3 font-semibold"
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Saving..."
            : isEdit
            ? "Update Announcement"
            : "Save Announcement"}
        </button>

      </div>
    </form>
  );
};

export default AnnouncementForm;
