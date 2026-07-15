import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AnnouncementForm from "@/components/announcements/AnnouncementForm";

import { getAnnouncement } from "@/services/announcementApi";

import type { Announcement } from "@/types/announcement";

const EditAnnouncement = () => {

  const { id } = useParams();

  const [announcement, setAnnouncement] =
    useState<Announcement | null>(null);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      if (!id) return;
      const data = await getAnnouncement(id);
      setAnnouncement(data);
    };

    fetchAnnouncement();
  }, [id]);

  if (!announcement) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold">
          Edit Announcement
        </h1>

      </div>

      <AnnouncementForm
        announcement={announcement}
      />

    </div>

  );

};

export default EditAnnouncement;