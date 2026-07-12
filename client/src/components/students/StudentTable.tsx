import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import type { Student } from "@/types/student";
import { deleteStudent } from "@/services/studentApi";

interface Props {
  students: Student[];
  refresh: () => void;
}

const StudentTable = ({
  students,
  refresh,
}: Props) => {

  const handleDelete = async (id: string) => {

    if (!confirm("Delete this student?")) return;

    try {

      await deleteStudent(id);

      alert("✅ Student deleted");

      refresh();

    } catch (error) {

      console.error(error);

      alert("❌ Delete failed");

    }

  };

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800">

      <div className="overflow-x-auto">

      <table className="w-full min-w-[820px]">

        <thead className="bg-zinc-900">

          <tr>

            <th className="p-4 text-left">Name</th>
            <th>Branch</th>
            <th>CGPA</th>
            <th>Status</th>
            <th>Company</th>
            <th>Package</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {students.map((student) => (

            <tr
              key={student._id}
              className="border-t border-zinc-800"
            >

              <td className="p-4">
                {student.name}
              </td>

              <td>{student.branch}</td>

              <td>{student.cgpa}</td>

              <td>{student.placementStatus}</td>

              <td>{student.placedCompany || "-"}</td>

              <td>
                {student.package
                  ? `₹${student.package} LPA`
                  : "-"}
              </td>

              <td className="flex gap-3 p-4">

                <Link
                  to={`/admin/students/edit/${student._id}`}
                  aria-label={`Edit ${student.name}`}
                  className="min-h-11 min-w-11 rounded bg-blue-600 p-2 hover:bg-blue-500"
                >
                  <Pencil size={16}/>
                </Link>

                <button
                  onClick={() =>
                    handleDelete(student._id!)
                  }
                  aria-label={`Delete ${student.name}`}
                  className="min-h-11 min-w-11 rounded bg-red-600 p-2 hover:bg-red-500"
                >
                  <Trash2 size={16}/>
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      </div>

    </div>
  );
};

export default StudentTable;
