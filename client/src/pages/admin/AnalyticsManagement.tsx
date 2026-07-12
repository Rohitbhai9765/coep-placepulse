import { useEffect, useState } from "react";

import {
  getAnalytics,
  updateAnalytics,
} from "@/services/analyticsApi";

import type {
  Analytics,
} from "@/types/analytics";

const AnalyticsManagement = () => {

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [analytics, setAnalytics] =
    useState<Analytics>({

      placementTrend: [],

      placementPulse: {

        activeCompanies: 0,

        interviewsToday: 0,

        offersReleased: 0,

        pendingResults: 0,

      },

    });

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const data =
        await getAnalytics();

      setAnalytics(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleTrendChange = (

    index: number,

    value: number

  ) => {

    const updated = [
      ...analytics.placementTrend,
    ];

    updated[index].placed = value;

    setAnalytics({

      ...analytics,

      placementTrend: updated,

    });

  };

  const handlePulseChange = (

    name: string,

    value: number

  ) => {

    setAnalytics({

      ...analytics,

      placementPulse: {

        ...analytics.placementPulse,

        [name]: value,

      },

    });

  };

  const handleSave = async () => {

    try {

      setSaving(true);

      await updateAnalytics(
        analytics
      );

      alert(
        "Analytics Updated Successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to update analytics"
      );

    } finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <h1 className="text-3xl font-bold">

          Loading Analytics...

        </h1>

      </div>

    );

  }

    return (

    <div className="mx-auto max-w-6xl space-y-8">

      {/* Hero */}

      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-violet-700/20 to-cyan-700/20 p-10">

        <h1 className="text-4xl font-bold">

          Analytics Management

        </h1>

        <p className="mt-3 text-zinc-400">

          Manage placement analytics shown on the dashboard.

        </p>

      </div>

      {/* Placement Trend */}

      <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

        <h2 className="mb-6 text-2xl font-bold">

          Placement Trend

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-zinc-700">

                <th className="py-3 text-left">

                  Month

                </th>

                <th className="py-3 text-left">

                  Students Placed

                </th>

              </tr>

            </thead>

            <tbody>

              {analytics.placementTrend.map(

                (
                  item,
                  index
                ) => (

                  <tr
                    key={item.month}
                    className="border-b border-zinc-800"
                  >

                    <td className="py-4 font-medium">

                      {item.month}

                    </td>

                    <td className="py-4">

                      <input

                        type="number"

                        value={item.placed}

                        onChange={(e) =>

                          handleTrendChange(

                            index,

                            Number(
                              e.target.value
                            )

                          )

                        }

                        className="w-32 rounded-lg border border-zinc-700 bg-zinc-900 p-2"

                      />

                    </td>

                  </tr>

                )

              )}

            </tbody>

          </table>

        </div>

      </div>

            {/* Placement Pulse */}

      <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

        <h2 className="mb-6 text-2xl font-bold">

          Placement Pulse

        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Active Companies

            </label>

            <input
              type="number"
              value={analytics.placementPulse.activeCompanies}
              onChange={(e) =>
                handlePulseChange(
                  "activeCompanies",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Interviews Today

            </label>

            <input
              type="number"
              value={analytics.placementPulse.interviewsToday}
              onChange={(e) =>
                handlePulseChange(
                  "interviewsToday",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Offers Released

            </label>

            <input
              type="number"
              value={analytics.placementPulse.offersReleased}
              onChange={(e) =>
                handlePulseChange(
                  "offersReleased",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Pending Results

            </label>

            <input
              type="number"
              value={analytics.placementPulse.pendingResults}
              onChange={(e) =>
                handlePulseChange(
                  "pendingResults",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3"
            />

          </div>

        </div>

      </div>

      {/* Save */}

      <div className="flex justify-end">

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-lg font-semibold transition hover:opacity-90 disabled:opacity-50"
        >

          {saving
            ? "Saving..."
            : "Save Analytics"}

        </button>

      </div>

    </div>

  );

};

export default AnalyticsManagement;