import { useEffect, useState } from "react";

import DashboardCard from "@/components/ui/DashboardCard";

import { CalendarDays, Clock } from "lucide-react";

import {
  getEvents,
} from "@/services/eventApi";

import type {
  Event,
} from "@/types/event";

const UpcomingDrives = () => {

  const [drives, setDrives] =
    useState<Event[]>([]);

  useEffect(() => {

    fetchDrives();

  }, []);

  const fetchDrives = async () => {

    try {

      const data =
        await getEvents();

      const upcoming = data

        .filter(
          (event) =>
            event.status ===
            "Upcoming"
        )

        .sort(
          (a, b) =>
            new Date(
              a.date
            ).getTime()

            -

            new Date(
              b.date
            ).getTime()
        )

        .slice(0, 5);

      setDrives(upcoming);

    } catch (error) {

      console.error(error);

    }

  };

  const formatDate = (
    date: string
  ) => {

    return new Date(date).toLocaleDateString(
      "en-IN",
      {

        day: "numeric",

        month: "short",

        year: "numeric",

      }
    );

  };

  return (

    <DashboardCard
      title="Upcoming Drives"
      subtitle="Scheduled placement activities"
      action="View Calendar"
    >

      <div className="space-y-4">

        {drives.map((drive) => (

          <div
            key={drive._id}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 transition-all hover:border-violet-500 hover:bg-zinc-900/70 sm:p-5"
          >

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

              <div className="flex min-w-0 gap-3 sm:gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">

                  <CalendarDays
                    className="text-violet-400"
                    size={22}
                  />

                </div>

                <div className="min-w-0">

                  <h3 className="break-words font-semibold text-white">

                    {drive.company}

                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">

                    {drive.title}

                  </p>

                  <p className="mt-1 text-xs text-zinc-500">

                    {drive.round}

                  </p>

                </div>

              </div>

              <span className="self-start rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">

                {formatDate(
                  drive.date
                )}

              </span>

            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-zinc-500">

              <Clock size={16} />

              {drive.venue}

            </div>

          </div>

        ))}

      </div>

    </DashboardCard>

  );

};

export default UpcomingDrives;
