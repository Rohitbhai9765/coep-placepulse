import { useEffect, useState } from "react";

import DashboardCard from "@/components/ui/DashboardCard";

import { Trophy } from "lucide-react";

import { getCompanies } from "@/services/companyApi";

import type { Company } from "@/types/company";

const TopRecruiters = () => {

  const [companies, setCompanies] =
    useState<Company[]>([]);

  useEffect(() => {

    fetchCompanies();

  }, []);

  const fetchCompanies = async () => {

    try {

      const data =
        await getCompanies();

      const sorted = [...data]

        .sort(

          (a, b) =>

            parseFloat(b.package)

            -

            parseFloat(a.package)

        )

        .slice(0, 5);

      setCompanies(sorted);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <DashboardCard
      title="Top Recruiters"
      subtitle="Highest Package Offered"
      action="View Companies"
    >

      <div className="space-y-4">

        {companies.map(

          (
            company,
            index
          ) => (

            <div
              key={company._id}
              className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 transition-all hover:border-violet-500"
            >

              <div className="flex min-w-0 items-center gap-3 sm:gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-purple-500 font-bold text-white">

                  {company.name.charAt(0)}

                </div>

                <div className="min-w-0">

                  <h3 className="break-words font-semibold text-white">

                    {company.name}

                  </h3>

                  <p className="text-xs text-zinc-500">

                    Rank #{index + 1}

                  </p>

                </div>

              </div>

              <div className="shrink-0 text-right">

                <div className="flex items-center justify-end gap-2">

                  {index === 0 && (

                    <Trophy
                      className="text-yellow-400"
                      size={18}
                    />

                  )}

                  <span className="text-2xl font-bold text-violet-400">

                    ₹{company.package}

                  </span>

                </div>

                <p className="text-xs text-zinc-500">

                  Package

                </p>

              </div>

            </div>

          )

        )}

      </div>

    </DashboardCard>

  );

};

export default TopRecruiters;
