import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  action?: string;
  children: ReactNode;
}

const DashboardCard = ({
  title,
  subtitle,
  action,
  children,
}: DashboardCardProps) => {
  return (
    <section className="group relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#1A1A1F] to-[#111113] p-4 transition-all duration-300 hover:border-violet-500 hover:shadow-[0_0_35px_rgba(124,58,237,.12)] sm:p-6">

      <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-violet-600/10 blur-3xl" />

      <div className="relative">

        <div className="mb-6 flex min-w-0 flex-col gap-3 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">

          <div className="min-w-0">

            <h2 className="text-xl font-semibold text-white">
              {title}
            </h2>

            {subtitle && (
              <p className="mt-1 text-sm text-zinc-500">
                {subtitle}
              </p>
            )}

          </div>

          {action && (
            <button className="flex shrink-0 items-center gap-1 self-start text-sm text-violet-400 transition hover:text-violet-300">
              {action}
              <ChevronRight size={16} />
            </button>
          )}

        </div>

        {children}

      </div>

    </section>
  );
};

export default DashboardCard;
