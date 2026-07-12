import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  icon: LucideIcon;
  to: string;
}

const QuickAction = ({
  title,
  icon: Icon,
  to,
}: Props) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-[#18181B] p-5 transition hover:border-violet-500 hover:bg-[#202024]"
    >
      <Icon
        size={24}
        className="text-violet-400"
      />

      <span className="font-medium">
        {title}
      </span>
    </Link>
  );
};

export default QuickAction;