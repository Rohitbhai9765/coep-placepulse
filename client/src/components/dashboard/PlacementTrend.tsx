import { useEffect, useState } from "react";

import DashboardCard from "@/components/ui/DashboardCard";

import { getAnalytics } from "@/services/analyticsApi";

import type { PlacementTrend as PlacementTrendType } from "@/types/analytics";
import useMediaQuery from "@/hooks/useMediaQuery";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
} from "recharts";

const PlacementTrend = () => {

  const isCompact = useMediaQuery("(max-width: 639px)");

  const [trend, setTrend] =
    useState<PlacementTrendType[]>([]);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const data =
        await getAnalytics();

      setTrend(data.placementTrend);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <DashboardCard
      title="Placement Trend"
      subtitle="Students placed over the season"
      action="Report"
    >

      <ResponsiveContainer
        width="100%"
        height={isCompact ? 260 : 320}
      >

        <AreaChart
          data={trend}
        >

          <defs>

            <linearGradient
              id="placementGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#8B5CF6"
                stopOpacity={0.7}
              />

              <stop
                offset="100%"
                stopColor="#8B5CF6"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            stroke="#27272A"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            stroke="#71717A"
            tick={{ fontSize: isCompact ? 10 : 12 }}
          />

          <Tooltip
            contentStyle={{
              background: "#18181B",
              border: "1px solid #3F3F46",
              borderRadius: "12px",
            }}
          />

          <Area
            type="monotone"
            dataKey="placed"
            stroke="#8B5CF6"
            strokeWidth={3}
            fill="url(#placementGradient)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </DashboardCard>

  );

};

export default PlacementTrend;
