import { useEffect, useState } from "react";

import {
  getDashboard,
  updateDashboard,
  type Dashboard,
} from "@/services/dashboardApi";

const DashboardContent = () => {

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [dashboard, setDashboard] =
    useState<Dashboard>({

      title: "",

      subtitle: "",

      description: "",

      studentsPlaced: 0,

      studentsPlacedChange: "",

      companiesVisited: 0,

      companiesVisitedChange: "",

      highestPackage: "",

      highestPackageLabel: "",

      averagePackage: "",

      averagePackageChange: "",

    });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const data =
        await getDashboard();

      setDashboard(data);

    } catch (error) {

      console.error(error);

      alert("Unable to fetch dashboard.");

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement
    >
  ) => {

    setDashboard({

      ...dashboard,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSave = async () => {

    try {

      setSaving(true);

      await updateDashboard({

        ...dashboard,

        studentsPlaced:
          Number(
            dashboard.studentsPlaced
          ),

        companiesVisited:
          Number(
            dashboard.companiesVisited
          ),

      });

      alert(
        "Dashboard updated successfully!"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to update dashboard."
      );

    } finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (

      <div className="flex h-[60vh] items-center justify-center">

        <h2 className="text-3xl font-bold">

          Loading Dashboard...

        </h2>

      </div>

    );

  }

  return (

    <div className="mx-auto max-w-5xl space-y-8">

      {/* Hero */}

      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-violet-700/20 to-cyan-700/20 p-10">

        <h1 className="text-4xl font-bold">

          Dashboard Content

        </h1>

        <p className="mt-3 text-zinc-400">

          Manage the homepage content shown to
          students and administrators.

        </p>

      </div>

      {/* Form */}

      <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

        <div className="space-y-6">

          <Input
            label="Welcome Title"
            name="title"
            value={dashboard.title}
            onChange={handleChange}
          />

          <Input
            label="Subtitle"
            name="subtitle"
            value={dashboard.subtitle}
            onChange={handleChange}
          />

          <div>

            <label className="mb-2 block font-medium text-zinc-300">

              Description

            </label>

            <textarea
              rows={4}
              name="description"
              value={dashboard.description}
              onChange={handleChange}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-violet-500"
            />

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <Input
              type="number"
              label="Students Placed"
              name="studentsPlaced"
              value={dashboard.studentsPlaced}
              onChange={handleChange}
            />

            <Input
              type="number"
              label="Companies Visited"
              name="companiesVisited"
              value={dashboard.companiesVisited}
              onChange={handleChange}
            />

            <Input
              label="Highest Package"
              name="highestPackage"
              value={dashboard.highestPackage}
              onChange={handleChange}
            />

            <Input
              label="Average Package"
              name="averagePackage"
              value={dashboard.averagePackage}
              onChange={handleChange}
            />

          </div>

          {/* New CMS Fields */}

          <div className="grid gap-6 md:grid-cols-2">

            <Input
              label="Students Placed Change"
              name="studentsPlacedChange"
              value={dashboard.studentsPlacedChange}
              onChange={handleChange}
            />

            <Input
              label="Companies Change"
              name="companiesVisitedChange"
              value={dashboard.companiesVisitedChange}
              onChange={handleChange}
            />

            <Input
              label="Highest Package Label"
              name="highestPackageLabel"
              value={dashboard.highestPackageLabel}
              onChange={handleChange}
            />

            <Input
              label="Average Package Change"
              name="averagePackageChange"
              value={dashboard.averagePackageChange}
              onChange={handleChange}
            />

          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 py-4 text-lg font-semibold transition hover:opacity-90 disabled:opacity-50"
          >

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </div>

    </div>

  );

};

interface InputProps {

  label: string;

  name: string;

  value: any;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  type?: string;

}

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: InputProps) => (

  <div>

    <label className="mb-2 block font-medium text-zinc-300">

      {label}

    </label>

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-violet-500"
    />

  </div>

);

export default DashboardContent;