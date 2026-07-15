import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getBranchStatistics } from "@/services/statisticsApi";
import type { BranchStatistics } from "@/types/branchStatistics";

const BranchAnalysis = () => {
  const [branches, setBranches] = useState<BranchStatistics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBranchData();
  }, []);

  const fetchBranchData = async () => {
    try {
      const data = await getBranchStatistics();
      setBranches(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <h2 className="text-3xl font-bold">Loading Analysis...</h2>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
          Branchwise Placement Analysis
        </h1>
        <p className="mt-2 text-zinc-500">
          Detailed breakdown of placements across all branches
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-zinc-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-zinc-900">
              <tr>
                <th className="p-4 text-left">Branch</th>
                <th className="p-4 text-left">Total Students</th>
                <th className="p-4 text-left">Placed</th>
                <th className="p-4 text-left">Placement %</th>
                <th className="p-4 text-left">Highest Package</th>
                <th className="p-4 text-left">Avg Package</th>
                <th className="p-4 text-left">Companies Placed In</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch) => (
                <tr key={branch.branch} className="border-t border-zinc-800">
                  <td className="p-4 whitespace-nowrap font-semibold">
                    {branch.branch}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {branch.totalStudents}
                  </td>
                  <td className="p-4 whitespace-nowrap text-emerald-400">
                    {branch.placedStudents}
                  </td>
                  <td className="p-4 whitespace-nowrap">
                    {branch.placementPercentage}%
                  </td>
                  <td className="p-4 whitespace-nowrap text-violet-400">
                    {branch.highestPackage ? `${branch.highestPackage} LPA` : "-"}
                  </td>
                  <td className="p-4 whitespace-nowrap text-orange-400">
                    {branch.averagePackage ? `${branch.averagePackage} LPA` : "-"}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {branch.companiesPlacedIn && branch.companiesPlacedIn.length > 0 ? (
                        branch.companiesPlacedIn.map((company, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
                          >
                            {company}
                          </span>
                        ))
                      ) : (
                        <span className="text-zinc-500">-</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {branches.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-zinc-500">
                    No branch data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default BranchAnalysis;
