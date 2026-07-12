import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Company } from "@/types/company";
import {
  createCompany,
  updateCompany,
} from "@/services/companyApi";

interface Props {
  company?: Company;
}

const CompanyForm = ({ company }: Props) => {
  const navigate = useNavigate();

  const isEdit = !!company;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    package: "",
    role: "",
    type: "",
    location: "",
    cgpa: "",
  });

  useEffect(() => {
    if (company) {
      setForm({
        name: company.name,
        package: company.package,
        role: company.role,
        type: company.type,
        location: company.location,
        cgpa: company.cgpa.toString(),
      });
    }
  }, [company]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload: Company = {
        _id: company?._id,

        name: form.name,
        package: form.package,
        role: form.role,
        type: form.type,
        location: form.location,
        cgpa: Number(form.cgpa),

        logo: company?.logo ?? "",
        description: company?.description ?? "",
        eligibleBranches:
          company?.eligibleBranches ?? [],
        rounds: company?.rounds ?? [],
        website: company?.website ?? "",
        applyLink: company?.applyLink ?? "",
        status: company?.status ?? "Upcoming",
      };

      if (isEdit && company?._id) {
        await updateCompany(company._id, payload);

        alert("✅ Company Updated Successfully");
      } else {
        await createCompany(payload);

        alert("✅ Company Added Successfully");
      }

      navigate("/admin/companies");
    } catch (error) {
      console.error(error);

      alert(
        isEdit
          ? "❌ Failed to update company"
          : "❌ Failed to add company"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-zinc-800 bg-[#18181B] p-4 sm:p-6 lg:p-8"
    >
      <div className="grid gap-6 md:grid-cols-2">

        <input
          name="name"
          placeholder="Company Name"
          value={form.name}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-violet-500"
        />

        <input
          name="package"
          placeholder="Package (e.g. ₹18 LPA)"
          value={form.package}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-violet-500"
        />

        <input
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-violet-500"
        />

        <input
          name="type"
          placeholder="FTE / Internship"
          value={form.type}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-violet-500"
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-violet-500"
        />

        <input
          name="cgpa"
          type="number"
          step="0.1"
          placeholder="Minimum CGPA"
          value={form.cgpa}
          onChange={handleChange}
          required
          className="min-h-11 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-violet-500"
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 min-h-11 w-full rounded-xl bg-violet-600 py-3 text-lg font-semibold transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? isEdit
            ? "Updating..."
            : "Saving..."
          : isEdit
          ? "Update Company"
          : "Save Company"}
      </button>
    </form>
  );
};

export default CompanyForm;
