import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import useMediaQuery from "@/hooks/useMediaQuery";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#10B981", // Placed
  "#EF4444", // Unplaced
  "#3B82F6", // Higher Studies
  "#F59E0B", // Entrepreneur
];

const PlacementPie = ({ data }: Props) => {
  const isCompact = useMediaQuery("(max-width: 639px)");

  return (
    <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#1C1C20] to-[#121214] p-4 sm:p-6 lg:p-8">

      <div className="mb-6 sm:mb-8">

        <h2 className="text-2xl font-bold sm:text-3xl">
          Placement Status
        </h2>

        <p className="mt-2 text-zinc-500">
          Distribution of student outcomes
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={isCompact ? 280 : 380}
      >

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={isCompact ? 84 : 120}
            innerRadius={isCompact ? 42 : 60}
            paddingAngle={4}
            dataKey="value"
            nameKey="name"
            label={!isCompact}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#18181B",
              border: "1px solid #3F3F46",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: isCompact ? 12 : 14 }}
          />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
};

export default PlacementPie;
