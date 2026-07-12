import type { BranchStatistics } from "@/types/branchStatistics";

interface Props {
  branches: BranchStatistics[];
}

const BranchTable = ({ branches }: Props) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#1C1C20] to-[#121214]">

      <div className="border-b border-zinc-800 p-4 sm:p-6 lg:p-8">

        <h2 className="text-2xl font-bold sm:text-3xl">
          Branch-wise Placement Statistics
        </h2>

        <p className="mt-2 text-zinc-500">
          Live placement analytics across all COEP departments
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full min-w-[760px]">

          <thead className="sticky top-0 bg-zinc-900">

            <tr className="text-zinc-300">

              <th className="p-5 text-left">#</th>

              <th className="text-left">
                Branch
              </th>

              <th>Total</th>

              <th>Placed</th>

              <th style={{ minWidth: 170 }}>
                Placement %
              </th>

              <th>Highest</th>

              <th>Average</th>

            </tr>

          </thead>

          <tbody>

            {branches.map((branch, index) => {

              const percentage =
                branch.placementPercentage;

              return (

                <tr
                  key={branch.branch}
                  className="border-t border-zinc-800 transition hover:bg-zinc-900/40"
                >

                  <td className="p-5 font-semibold text-violet-400">
                    #{index + 1}
                  </td>

                  <td className="font-semibold">
                    {branch.branch}
                  </td>

                  <td className="text-center">
                    {branch.totalStudents}
                  </td>

                  <td className="text-center text-green-400 font-semibold">
                    {branch.placedStudents}
                  </td>

                  <td className="px-5">

                    <div className="flex items-center gap-3">

                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-zinc-800">

                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            percentage >= 90
                              ? "bg-green-500"
                              : percentage >= 75
                              ? "bg-blue-500"
                              : percentage >= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                      <span className="w-14 text-right font-semibold">
                        {percentage}%
                      </span>

                    </div>

                  </td>

                  <td className="text-center font-semibold text-yellow-400">
                    ₹{branch.highestPackage}
                  </td>

                  <td className="text-center font-semibold text-emerald-400">
                    ₹{branch.averagePackage}
                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default BranchTable;
