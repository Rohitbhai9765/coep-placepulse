import { useEffect, useState } from "react";

import DashboardCard from "@/components/ui/DashboardCard";

import { Flame, TrendingUp, Activity } from "lucide-react";

import { getAnalytics } from "@/services/analyticsApi";

import type {
  PlacementPulse as PlacementPulseType,
} from "@/types/analytics";

type PlacementPulseState = PlacementPulseType & {
  score: number;
  status: string;
  change: string;
  updated: string;
};

const PlacementPulse = () => {

  const [pulse, setPulse] =
    useState<PlacementPulseState>({
      score: 0,

      activeCompanies: 0,

      interviewsToday: 0,

      offersReleased: 0,

      pendingResults: 0,

      status: "",
      change: "",
      updated: "",

    });

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const data =
        await getAnalytics();

      setPulse((prev) => ({
        ...prev,
        ...data.placementPulse,
      }));

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <DashboardCard
      title="Placement Pulse"
      subtitle="Live placement activity"
    >

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10">

          <Flame
            className="text-orange-400"
            size={24}
          />

        </div>

        <div>

          <p className="text-sm text-zinc-500">

            Current Activity Score

          </p>

          <h2 className="mt-1 text-5xl font-bold text-white">

            {pulse.score}

            <span className="text-2xl text-zinc-500">

              /100

            </span>

          </h2>

        </div>

      </div>

      <div className="mt-8">

        <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 transition-all duration-700"
            style={{
              width: `${pulse.score}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <p className="font-semibold text-emerald-400">

            {pulse.status}

          </p>

          <p className="text-sm text-zinc-500">

            Updated {pulse.updated}

          </p>

        </div>

        <div className="self-start rounded-xl bg-emerald-500/10 px-4 py-2 sm:self-auto">

          <div className="flex items-center gap-2">

            <TrendingUp
              size={18}
              className="text-emerald-400"
            />

            <span className="font-semibold text-emerald-400">

              {pulse.change}

            </span>

          </div>

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-zinc-800 p-4">

        <div className="mb-4 flex items-center gap-3">

          <Activity
            size={18}
            className="text-violet-400"
          />

          <span className="font-semibold">

            Live Metrics

          </span>

        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div>

            Active Companies

            <div className="mt-1 text-xl font-bold text-violet-400">

              {pulse.activeCompanies}

            </div>

          </div>

          <div>

            Interviews Today

            <div className="mt-1 text-xl font-bold text-violet-400">

              {pulse.interviewsToday}

            </div>

          </div>

          <div>

            Offers Released

            <div className="mt-1 text-xl font-bold text-violet-400">

              {pulse.offersReleased}

            </div>

          </div>

          <div>

            Pending Results

            <div className="mt-1 text-xl font-bold text-violet-400">

              {pulse.pendingResults}

            </div>

          </div>

        </div>

      </div>

    </DashboardCard>

  );

};

export default PlacementPulse;
