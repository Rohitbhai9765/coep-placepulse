import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import useMediaQuery from "@/hooks/useMediaQuery";

interface Props {
  data: {
    range: string;
    count: number;
  }[];
}

const PackageChart = ({ data }: Props) => {
  const isCompact = useMediaQuery("(max-width: 639px)");

  return (
    <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#1C1C20] to-[#121214] p-4 sm:p-6 lg:p-8">

      <div className="mb-6 sm:mb-8">

        <h2 className="text-2xl font-bold sm:text-3xl">
          Package Distribution
        </h2>

        <p className="mt-2 text-zinc-500">
          Students grouped by salary package
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={isCompact ? 260 : 380}
      >

        <BarChart
          data={data}
          margin={{
            top: 8,
            right: 8,
            left: isCompact ? -18 : 0,
            bottom: isCompact ? 38 : 0,
          }}
        >

          <CartesianGrid
            stroke="#333"
            strokeDasharray="3 3"
          />

          <XAxis
            dataKey="range"
            tick={{
              fill: "#A1A1AA",
              fontSize: isCompact ? 10 : 12,
            }}
            angle={isCompact ? -35 : 0}
            textAnchor={isCompact ? "end" : "middle"}
            height={isCompact ? 56 : 30}
          />

          <YAxis
            tick={{
              fill: "#A1A1AA",
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#18181B",
              border: "1px solid #3F3F46",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Bar
            dataKey="count"
            fill="#10B981"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default PackageChart;
