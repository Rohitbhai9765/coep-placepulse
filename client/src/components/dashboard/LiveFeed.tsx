import { useEffect, useState } from "react";

import DashboardCard from "@/components/ui/DashboardCard";

import { BellRing } from "lucide-react";

import { motion } from "framer-motion";

import {
  getAnnouncements,
} from "@/services/announcementApi";

import type {
  Announcement,
} from "@/types/announcement";

const badgeClasses: Record<string, string> = {

  High:
    "bg-red-500/10 text-red-400 border-red-500/20",

  Medium:
    "bg-orange-500/10 text-orange-400 border-orange-500/20",

  Low:
    "bg-blue-500/10 text-blue-400 border-blue-500/20",

};

const LiveFeed = () => {

  const [announcements, setAnnouncements] =
    useState<Announcement[]>([]);

  useEffect(() => {

    fetchAnnouncements();

  }, []);

  const fetchAnnouncements = async () => {

    try {

      const data =
        await getAnnouncements();

      const latest = [...data]

        .sort(

          (a, b) =>

            new Date(
              b.createdAt ?? ""
            ).getTime()

            -

            new Date(
              a.createdAt ?? ""
            ).getTime()

        )

        .slice(0, 5);

      setAnnouncements(latest);

    } catch (error) {

      console.error(error);

    }

  };

  const formatTime = (
    date?: string
  ) => {

    if (!date) return "";

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
      title="Live Feed"
      subtitle="Latest placement updates"
      action="View All"
    >

      <div className="space-y-4">

        {announcements.map(
          (
            item,
            index
          ) => (

            <motion.div
              key={item._id}
              initial={{
                opacity: 0,
                x: 15,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay:
                  index * 0.08,
              }}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 transition-all hover:border-violet-500 sm:p-5"
            >

              <div className="flex min-w-0 gap-3 sm:gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-600/15">

                  <BellRing
                    className="text-violet-400"
                    size={20}
                  />

                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-2">

                    <h3 className="min-w-0 break-words font-semibold text-white">

                      {item.title}

                    </h3>

                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 text-xs ${

                        badgeClasses[
                          item.priority
                        ]

                      }`}
                    >

                      {item.priority}

                    </span>

                  </div>

                  <p className="mt-2 text-sm leading-6 text-zinc-400">

                    {item.description}

                  </p>

                  <div className="mt-4 flex items-center justify-between">

                    <span className="text-xs text-zinc-500">

                      {formatTime(
                        item.createdAt
                      )}

                    </span>

                    {item.priority ===
                      "High" && (

                      <span className="animate-pulse rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">

                        LIVE

                      </span>

                    )}

                  </div>

                </div>

              </div>

            </motion.div>

          )
        )}

      </div>

    </DashboardCard>

  );

};

export default LiveFeed;
