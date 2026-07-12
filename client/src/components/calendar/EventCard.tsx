import type { Event } from "@/types/event";

interface Props {
  event: Event;
}

const EventCard = ({ event }: Props) => {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-6">

      <h2 className="text-2xl font-bold">
        {event.company}
      </h2>

      <p className="mt-2 text-zinc-400">
        {event.title}
      </p>

      <div className="mt-6 space-y-2 text-sm">

        <p>📅 {new Date(event.date).toLocaleDateString()}</p>

        <p>📍 {event.venue}</p>

        <p>🎯 {event.round}</p>

      </div>

    </div>
  );
};

export default EventCard;