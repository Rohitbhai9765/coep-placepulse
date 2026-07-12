import type { Announcement } from "@/types/announcement";

interface Props {
  announcement: Announcement;
}

const priorityStyles = {
  High: "bg-red-500/20 text-red-400",
  Medium: "bg-yellow-500/20 text-yellow-400",
  Low: "bg-emerald-500/20 text-emerald-400",
};

const AnnouncementCard = ({
  announcement,
}: Props) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4 sm:p-6">

      <div className="flex items-start justify-between gap-3">

        <h2 className="min-w-0 break-words text-xl font-bold">
          {announcement.title}
        </h2>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
            priorityStyles[announcement.priority]
          }`}
        >
          {announcement.priority}
        </span>

      </div>

      <p className="mt-4 text-zinc-400">
        {announcement.description}
      </p>

    </div>
  );
};

export default AnnouncementCard;
