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
    <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-6">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {value}
          </h2>

        </div>

        <div className={`rounded-2xl p-4 ${color}`}>

          <Icon size={30} />

        </div>

      </div>

    </div>
  );
};

export default StatCard;