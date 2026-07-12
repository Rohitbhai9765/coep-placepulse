import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Company } from "@/types/company";
import { getCompany } from "@/services/companyApi";

const CompanyDetails = () => {
  const { id } = useParams();

  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchCompany(id);
    }
  }, [id]);

  const fetchCompany = async (companyId: string) => {
    try {
      const data = await getCompany(companyId);
      setCompany(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-xl">
        Loading...
      </div>
    );
  }

  if (!company) {
    return (
      <div className="text-center text-2xl">
        Company not found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="break-words text-3xl font-bold sm:text-4xl lg:text-5xl">
          {company.name}
        </h1>

        <p className="mt-3 text-xl text-zinc-400">
          {company.role}
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4 sm:p-6">

          <h2 className="mb-4 text-xl font-semibold">
            Company Information
          </h2>

          <p><strong>Package:</strong> {company.package}</p>

          <p><strong>Location:</strong> {company.location}</p>

          <p><strong>Type:</strong> {company.type}</p>

          <p><strong>CGPA:</strong> {company.cgpa}</p>

          <p><strong>Status:</strong> {company.status}</p>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4 sm:p-6">

          <h2 className="mb-4 text-xl font-semibold">
            Eligible Branches
          </h2>

          <ul className="space-y-2">

            {company.eligibleBranches.map(branch => (
              <li key={branch}>
                • {branch}
              </li>
            ))}

          </ul>

        </div>

      </div>

      <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4 sm:p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Selection Process
        </h2>

        <ul className="space-y-3">

          {company.rounds.map(round => (
            <li key={round}>
              ✅ {round}
            </li>
          ))}

        </ul>

      </div>

      <div className="rounded-2xl border border-zinc-800 bg-[#18181B] p-4 sm:p-6">

        <h2 className="mb-4 text-xl font-semibold">
          Description
        </h2>

        <p className="text-zinc-300">
          {company.description}
        </p>

      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">

        <a
          href={company.website}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl bg-violet-600 px-6 py-3 text-center sm:w-auto"
        >
          Website
        </a>

        <a
          href={company.applyLink}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-violet-500 px-6 py-3 text-center sm:w-auto"
        >
          Apply Now
        </a>

      </div>

    </div>
  );
};

export default CompanyDetails;
