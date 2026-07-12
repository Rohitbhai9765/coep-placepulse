import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import type { Event } from "@/types/event";

import { deleteEvent } from "@/services/eventApi";

interface Props {
  events: Event[];
  refresh: () => void;
}

const EventTable = ({
  events,
  refresh,
}: Props) => {

  const handleDelete = async (id: string) => {

    if (!confirm("Delete Event?")) return;

    await deleteEvent(id);

    refresh();

  };

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800">

      <div className="overflow-x-auto">

      <table className="w-full min-w-[560px]">

        <thead className="bg-zinc-900">

          <tr>

            <th className="p-4 text-left">Company</th>

            <th>Round</th>

            <th>Date</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {events.map((event) => (

            <tr
              key={event._id}
              className="border-t border-zinc-800"
            >

              <td className="p-4">
                {event.company}
              </td>

              <td>{event.round}</td>

              <td>
                {new Date(event.date).toLocaleDateString()}
              </td>

              <td className="flex gap-3 p-4">

                <Link
                  to={`/admin/calendar/edit/${event._id}`}
                  aria-label={`Edit ${event.company} event`}
                  className="min-h-11 min-w-11 rounded bg-blue-600 p-2"
                >
                  <Pencil size={16}/>
                </Link>

                <button
                  onClick={() =>
                    handleDelete(event._id!)
                  }
                  aria-label={`Delete ${event.company} event`}
                  className="min-h-11 min-w-11 rounded bg-red-600 p-2"
                >
                  <Trash2 size={16}/>
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      </div>

    </div>
  );
};

export default EventTable;
