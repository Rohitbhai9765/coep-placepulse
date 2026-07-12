import { useEffect, useState } from "react";

import {
  Building2,
  CalendarDays,
  Megaphone,
  Trophy,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import StatCard from "@/components/statistics/StatCard";

import { getCompanies } from "@/services/companyApi";
import { getAnnouncements } from "@/services/announcementApi";
import { getEvents } from "@/services/eventApi";

const StudentDashboard = () => {
  const { user } = useAuth();

  const [companies, setCompanies] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const companyData = await getCompanies();
      const announcementData = await getAnnouncements();
      const eventData = await getEvents();

      setCompanies(companyData);
      setAnnouncements(announcementData);
      setEvents(eventData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-10">

      {/* Header */}

      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-violet-700/20 to-blue-700/20 p-10">

        <h1 className="text-4xl font-bold">
          Welcome, {user?.name}
        </h1>

        <p className="mt-3 text-zinc-400">
          View the latest placement updates, companies,
          announcements and upcoming drives.
        </p>

      </div>

      {/* Quick Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Companies"
          value={companies.length}
          icon={Building2}
          color="bg-blue-600/20 text-blue-400"
        />

        <StatCard
          title="Announcements"
          value={announcements.length}
          icon={Megaphone}
          color="bg-pink-600/20 text-pink-400"
        />

        <StatCard
          title="Upcoming Drives"
          value={events.length}
          icon={CalendarDays}
          color="bg-orange-600/20 text-orange-400"
        />

        <StatCard
          title="Status"
          value="Active"
          icon={Trophy}
          color="bg-green-600/20 text-green-400"
        />

      </div>

      {/* Upcoming Drives */}

      <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

        <h2 className="mb-6 text-2xl font-bold">
          Upcoming Placement Drives
        </h2>

        <div className="space-y-4">

          {events.slice(0, 5).map((event: any) => (

            <div
              key={event._id}
              className="rounded-xl border border-zinc-700 p-4"
            >
              <h3 className="font-semibold">
                {event.company}
              </h3>

              <p className="text-sm text-zinc-500">
                {new Date(event.date).toLocaleDateString()}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Announcements */}

      <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

        <h2 className="mb-6 text-2xl font-bold">
          Latest Announcements
        </h2>

        <div className="space-y-4">

          {announcements.slice(0, 5).map((announcement: any) => (

            <div
              key={announcement._id}
              className="rounded-xl border border-zinc-700 p-4"
            >
              <h3 className="font-semibold">
                {announcement.title}
              </h3>

              <p className="mt-2 text-zinc-500">
                {announcement.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;
