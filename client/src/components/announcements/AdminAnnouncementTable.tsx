import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import type { Announcement } from "@/types/announcement";
import { deleteAnnouncement } from "@/services/announcementApi";

interface Props {
  announcements: Announcement[];
  refresh: () => void;
}

const AdminAnnouncementTable = ({
  announcements,
  refresh,
}: Props) => {

  const handleDelete = async (id: string) => {

    if (!confirm("Delete announcement?")) return;

    try {

      await deleteAnnouncement(id);

      refresh();

    } catch {

      alert("Unable to delete.");

    }

  };

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800">

      <div className="overflow-x-auto">

      <table className="w-full min-w-[540px]">

        <thead className="bg-zinc-900">

          <tr>

            <th className="p-4 text-left">Title</th>

            <th className="text-left">Priority</th>

            <th className="text-left">Actions</th>

          </tr>

        </thead>

        <tbody>

          {announcements.map((announcement) => (

            <tr
              key={announcement._id}
              className="border-t border-zinc-800"
            >

              <td className="p-4">
                {announcement.title}
              </td>

              <td>
                {announcement.priority}
              </td>

              <td className="flex gap-3 p-4">

                <Link
                  to={`/admin/announcements/edit/${announcement._id}`}
                  aria-label={`Edit ${announcement.title}`}
                  className="min-h-11 min-w-11 rounded bg-blue-600 p-2 hover:bg-blue-500"
                >
                  <Pencil size={16}/>
                </Link>

                <button
                  onClick={() =>
                    handleDelete(announcement._id!)
                  }
                  aria-label={`Delete ${announcement.title}`}
                  className="min-h-11 min-w-11 rounded bg-red-600 p-2 hover:bg-red-500"
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

export default AdminAnnouncementTable;
