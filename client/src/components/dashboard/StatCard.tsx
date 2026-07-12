import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: Props) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#1C1C20] to-[#121214] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-2xl hover:shadow-violet-500/10">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm uppercase tracking-wider text-zinc-400">
            {title}
          </p>

          <h2 className="mt-5 text-4xl font-bold text-white">
            {value}
          </h2>

        </div>

        <div
          className={`rounded-2xl p-4 transition-all duration-300 group-hover:scale-110 ${color}`}
        >
          <Icon size={34} />
        </div>

      </div>

    </div>
  );
};

export default StatCard;