import { useEffect, useState } from "react";

import {
  Users,
  Building2,
  CalendarDays,
  Megaphone,
  IndianRupee,
  Trophy,
} from "lucide-react";

import StatCard from "@/components/statistics/StatCard";
import BranchChart from "@/components/statistics/BranchChart";
import PackageChart from "@/components/statistics/PackageChart";
import PlacementPie from "@/components/statistics/PlacementPie";
import BranchTable from "@/components/statistics/BranchTable";

import type { DashboardStatistics } from "@/types/statistics";
import type { BranchStatistics } from "@/types/branchStatistics";

import {
  getDashboardStatistics,
  getBranchStatistics,
  getPackageDistribution,
  getPlacementStatus,
} from "@/services/statisticsApi";

const Statistics = () => {
  const [stats, setStats] =
    useState<DashboardStatistics | null>(null);

  const [branches, setBranches] =
    useState<BranchStatistics[]>([]);

  const [packages, setPackages] =
    useState<{ range: string; count: number }[]>([]);

  const [statusData, setStatusData] =
    useState<{ name: string; value: number }[]>([]);

  const fetchStatistics = async () => {
    try {
      const dashboard =
        await getDashboardStatistics();
      setStats(dashboard);

      const branchData =
        await getBranchStatistics();
      setBranches(branchData);

      const packageData =
        await getPackageDistribution();
      setPackages(packageData);

      const placementData =
        await getPlacementStatus();
      setStatusData(placementData);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (!stats) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>

          <p className="mt-6 text-xl text-zinc-400">
            Loading Statistics...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* HERO */}

      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-violet-700/20 via-zinc-900 to-blue-700/20 p-10">

        <h1 className="text-5xl font-bold">
          Placement Analytics Dashboard
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-zinc-400">
          Real-time placement insights for COEP Technological University.
          Track students, companies, packages and branch-wise placement
          performance from one centralized dashboard.
        </p>

      </div>

      {/* STAT CARDS */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Students"
          value={stats.totalStudents}
          icon={Users}
          color="bg-violet-600/20 text-violet-400"
        />

        <StatCard
          title="Placed"
          value={stats.placedStudents}
          icon={Trophy}
          color="bg-green-600/20 text-green-400"
        />

        <StatCard
          title="Placement %"
          value={`${stats.placementPercentage}%`}
          icon={Users}
          color="bg-cyan-600/20 text-cyan-400"
        />

        <StatCard
          title="Companies"
          value={stats.companies}
          icon={Building2}
          color="bg-blue-600/20 text-blue-400"
        />

        <StatCard
          title="Events"
          value={stats.events}
          icon={CalendarDays}
          color="bg-orange-600/20 text-orange-400"
        />

        <StatCard
          title="Announcements"
          value={stats.announcements}
          icon={Megaphone}
          color="bg-pink-600/20 text-pink-400"
        />

        <StatCard
          title="Highest Package"
          value={`₹${stats.highestPackage} LPA`}
          icon={IndianRupee}
          color="bg-yellow-600/20 text-yellow-400"
        />

        <StatCard
          title="Average Package"
          value={`₹${stats.averagePackage} LPA`}
          icon={IndianRupee}
          color="bg-emerald-600/20 text-emerald-400"
        />

      </div>

      {/* FIRST ROW */}

      <div className="grid gap-8 xl:grid-cols-2">

        <BranchChart branches={branches} />

        <PlacementPie data={statusData} />

      </div>

      {/* SECOND ROW */}

      <PackageChart data={packages} />

      {/* TABLE */}

      <BranchTable branches={branches} />

    </div>
  );
};

export default Statistics;