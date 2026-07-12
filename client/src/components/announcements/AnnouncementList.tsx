import type { Announcement } from "@/types/announcement";
import AnnouncementCard from "./AnnouncementCard";

interface Props {
  announcements: Announcement[];
}

const AnnouncementList = ({
  announcements,
}: Props) => {
  if (announcements.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-700 py-16 text-center">
        <h2 className="text-2xl font-semibold">
          No Announcements
        </h2>

        <p className="mt-2 text-zinc-500">
          Nothing to display.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement._id}
          announcement={announcement}
        />
      ))}
    </div>
  );
};

export default AnnouncementList;