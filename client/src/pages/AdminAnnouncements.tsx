import AnnouncementForm from "@/components/announcements/AnnouncementForm";

const AdminAnnouncements = () => {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold">
          Add Announcement
        </h1>

        <p className="mt-2 text-zinc-500">
          Publish placement announcements.
        </p>

      </div>

      <AnnouncementForm />

    </div>
  );
};

export default AdminAnnouncements;