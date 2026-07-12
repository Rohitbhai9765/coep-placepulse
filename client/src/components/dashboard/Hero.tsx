import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";

import {
  getDashboard,
  type Dashboard,
} from "@/services/dashboardApi";

const Hero = () => {

  const { user } = useAuth();

  const [dashboard, setDashboard] =
    useState<Dashboard | null>(null);

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

    }

  };

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (

    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-r from-violet-600/15 via-[#18181B] to-[#18181B] p-4 sm:p-6 lg:p-8"
    >

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        <div>

          <p className="text-zinc-400">

            {greeting} 👋

          </p>

          <h1 className="mt-2 break-words text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">

            {dashboard?.title}

          </h1>

          <h2 className="mt-3 break-words text-xl font-semibold text-violet-400 sm:text-2xl">

            Welcome back, {user?.name}

          </h2>

          <p className="mt-4 text-lg font-medium text-zinc-300">

            {dashboard?.subtitle}

          </p>

          <p className="mt-3 max-w-xl text-lg text-zinc-400">

            {dashboard?.description}

          </p>

        </div>

        <div className="self-start rounded-full border border-red-500/20 bg-red-500/10 px-4 py-3 sm:px-6">

          <div className="flex items-center gap-2 text-red-400">

            <Activity size={18} />

            Placement Season LIVE

          </div>

        </div>

      </div>

    </motion.section>

  );

};

export default Hero;
