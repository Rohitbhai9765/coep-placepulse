import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Announcement } from "@/types/announcement";

import { getAnnouncements } from "@/services/announcementApi";

import AdminAnnouncementTable
from "@/components/announcements/AdminAnnouncementTable";

const AdminAnnouncementManagement = () => {

  const [announcements, setAnnouncements] =
    useState<Announcement[]>([]);

  const fetchAnnouncements = async () => {

    const data = await getAnnouncements();

    setAnnouncements(data);

  };

  useEffect(() => {

    fetchAnnouncements();

  }, []);

  return (
    <div className="space-y-8">

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Announcements
          </h1>

          <p className="mt-2 text-zinc-500">
            Manage announcements.
          </p>

        </div>

        <Link
          to="/admin/announcements"
          className="w-full rounded-xl bg-violet-600 px-6 py-3 text-center sm:w-auto"
        >
          + Add Announcement
        </Link>

      </div>

      <AdminAnnouncementTable
        announcements={announcements}
        refresh={fetchAnnouncements}
      />

    </div>
  );
};

export default AdminAnnouncementManagement;
