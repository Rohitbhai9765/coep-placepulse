import { useEffect, useState } from "react";

import type { Announcement } from "@/types/announcement";

import { getAnnouncements } from "@/services/announcementApi";

import AnnouncementList from "@/components/announcements/AnnouncementList";

const Announcements = () => {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const data = await getAnnouncements();

      setAnnouncements(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-xl">
        Loading announcements...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold">
          Announcements
        </h1>

        <p className="mt-2 text-zinc-500">
          Latest placement updates.
        </p>

      </div>

      <AnnouncementList
        announcements={announcements}
      />

    </div>
  );
};

export default Announcements;