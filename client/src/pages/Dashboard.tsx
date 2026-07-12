import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Users,
  Building2,
  IndianRupee,
  TrendingUp,
} from "lucide-react";

import Hero from "@/components/dashboard/Hero";
import StatCard from "@/components/dashboard/StatCard";
import PlacementTrend from "@/components/dashboard/PlacementTrend";
import PlacementPulse from "@/components/dashboard/PlacementPulse";
import LiveFeed from "@/components/dashboard/LiveFeed";
import UpcomingDrives from "@/components/dashboard/UpcomingDrives";
import TopRecruiters from "@/components/dashboard/TopRecruiters";

import {
  getDashboard,
  type Dashboard as DashboardType,
} from "@/services/dashboardApi";

const Dashboard = () => {

  const [dashboard, setDashboard] =
    useState<DashboardType | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const data =
        await getDashboard();

      setDashboard(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const dashboardStats = dashboard
    ? [
        {
          title: "Students Placed",
          value: dashboard.studentsPlaced.toString(),
          change: dashboard.studentsPlacedChange,
          icon: Users,
          color: "text-emerald-400",
        },

        {
          title: "Companies",
          value: dashboard.companiesVisited.toString(),
          change: dashboard.companiesVisitedChange,
          icon: Building2,
          color: "text-blue-400",
        },

        {
          title: "Highest Package",
          value: dashboard.highestPackage,
          change: dashboard.highestPackageLabel,
          icon: TrendingUp,
          color: "text-violet-400",
        },

        {
          title: "Average Package",
          value: dashboard.averagePackage,
          change: dashboard.averagePackageChange,
          icon: IndianRupee,
          color: "text-orange-400",
        },

      ]
    : [];

  if (loading) {

    return (

      <div className="flex h-[60vh] items-center justify-center">

        <h2 className="text-3xl font-bold">

          Loading Dashboard...

        </h2>

      </div>

    );

  }

  return (

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >

      {/* Hero */}

      <Hero />

      {/* Statistics */}

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {dashboardStats.map((stat) => (

          <StatCard
            key={stat.title}
            {...stat}
          />

        ))}

      </section>

      {/* Analytics */}

      <section className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">

          <PlacementTrend />

        </div>

        <PlacementPulse />

      </section>

      {/* Activity */}

      <section className="grid gap-6 xl:grid-cols-2">

        <LiveFeed />

        <UpcomingDrives />

      </section>

      {/* Recruiters */}

      <section className="grid gap-6 xl:grid-cols-2">

        <TopRecruiters />

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6">

          <h2 className="text-xl font-semibold">

            Activity Heatmap

          </h2>

          <p className="mt-2 text-zinc-500">

            Coming Soon...

          </p>

        </div>

      </section>

    </motion.div>

  );

};

export default Dashboard;