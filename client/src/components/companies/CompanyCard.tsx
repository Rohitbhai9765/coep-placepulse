import type { Company } from "@/types/company";
import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  company: Company;
}

const statusStyles = {
  Upcoming: "bg-blue-500/10 text-blue-400",
  Ongoing: "bg-emerald-500/10 text-emerald-400",
  Completed: "bg-zinc-700 text-zinc-300",
};

const CompanyCard = ({ company }: Props) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-800 bg-linear-to-br from-[#18181B] to-[#111113] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-[0_0_35px_rgba(124,58,237,.15)] sm:p-6">

      <div className="flex items-center justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/15">
          <Building2
            className="text-violet-400"
            size={28}
          />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            statusStyles[company.status]
          }`}
        >
          {company.status}
        </span>

      </div>

      <h2 className="mt-6 break-words text-2xl font-bold">
        {company.name}
      </h2>

      <p className="mt-2 text-zinc-400">
        {company.role}
      </p>

      <div className="mt-6 flex items-center justify-between">

        <div>

          <p className="text-xs text-zinc-500">
            Package
          </p>

          <h3 className="text-xl font-bold text-violet-400">
            {company.package}
          </h3>

        </div>

        <Link
          to={`/companies/${company._id}`}
          className="flex items-center gap-2 text-violet-400 transition group-hover:translate-x-1"
        >
          View

          <ArrowRight size={18} />
        </Link>

      </div>

      <div className="mt-6 flex flex-wrap gap-2">

        {company.eligibleBranches.map((branch) => (
          <span
            key={branch}
            className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
          >
            {branch}
          </span>
        ))}

      </div>

    </div>
  );
};

export default CompanyCard;
