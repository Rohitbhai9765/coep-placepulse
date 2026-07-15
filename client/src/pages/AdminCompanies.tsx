import { useEffect, useState } from "react";


import type { Company } from "@/types/company";
import {
  getCompanies,
  deleteCompany,
} from "@/services/companyApi";

import { Pencil, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";


const AdminCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this company?"
  );

  if (!confirmed) return;

  try {
    await deleteCompany(id);

    setCompanies((prev) =>
      prev.filter((company) => company._id !== id)
    );

    alert("✅ Company deleted successfully");
  } catch (error) {
    console.error(error);
    alert("❌ Failed to delete company");
  }
};

  if (loading) {
    return <h2 className="text-xl">Loading...</h2>;
  }

  return (
    <div className="space-y-8">

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

        <div>

          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Company Management
          </h1>

          <p className="mt-2 text-zinc-500">
            Manage placement companies
          </p>

        </div>

        <Link
          to="/admin/add-company"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 sm:w-auto"
        >
          <Plus size={18} />

          Add Company
        </Link>

      </div>

      <div className="overflow-hidden rounded-3xl border border-zinc-800">

        <div className="overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead className="bg-zinc-900">

            <tr>

              <th className="p-4 text-left">Company</th>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-left">Package</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {companies.map((company) => (



              <tr
                key={company._id}
                className="border-t border-zinc-800"
              >

                <td className="p-4 whitespace-nowrap">
                  {company.name}
                </td>

                <td className="p-4 whitespace-nowrap">
                  {company.role}
                </td>

                <td className="p-4 whitespace-nowrap">
                  {company.package}
                </td>

                <td className="p-4 whitespace-nowrap">
                  {company.status}
                </td>

                <td className="p-4 whitespace-nowrap">

                  <div className="flex justify-end gap-3">

                    <Link
                        to={`/admin/companies/edit/${company._id}`}
                        aria-label={`Edit ${company.name}`}
                        className="min-h-11 min-w-11 rounded-lg bg-blue-600 p-2 transition hover:bg-blue-500"
                    >
                        <Pencil size={18} />
                    </Link>

                    <button
                        onClick={() => handleDelete(company._id!)}
                        aria-label={`Delete ${company.name}`}
                        className="min-h-11 min-w-11 rounded-lg bg-red-600 p-2 transition hover:bg-red-500"
                    >
                        <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        </div>

      </div>

    </div>
  );
};

export default AdminCompanies;
