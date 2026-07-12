import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Student } from "@/types/student";

import {
  createStudent,
  updateStudent,
} from "@/services/studentApi";

interface Props {
  student?: Student;
}

const BRANCHES = [
  "Civil",
  "CSE",
  "Electrical",
  "ENTC",
  "Instrumentation",
  "Manufacturing",
  "Mechanical",
  "Metallurgy",
  "Planning",
  "Robotics & AI",
];

const StudentForm = ({ student }: Props) => {
  const navigate = useNavigate();

  const isEdit = !!student;

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    phone: "",

    branch: "Civil",

    cgpa: "",

    backlogs: "0",

    passingYear: "2027",

    placementStatus: "Unplaced",

    placedCompany: "",

    package: "",

    linkedin: "",

    github: "",


  });

  useEffect(() => {
    if (!student) return;

    setForm({
      name: student.name,
      rollNo: student.rollNo,
      email: student.email,
      phone: student.phone,

      branch: student.branch,

      cgpa: student.cgpa.toString(),

      backlogs: student.backlogs.toString(),

      passingYear: "2027",

        placementStatus: student.placementStatus,

        placedCompany: student.placedCompany,

        package: student.package.toString(),

        linkedin: student.linkedin,

        github: student.github,

    });
  }, [student]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setLoading(true);

  try {
    const payload: Student = {
      _id: student?._id,

      name: form.name,
      rollNo: form.rollNo,
      email: form.email,
      phone: form.phone,

      branch: form.branch as Student["branch"],

      cgpa: Number(form.cgpa),

      backlogs: Number(form.backlogs),

      passingYear: Number(form.passingYear),

      skills: [],

      linkedin: form.linkedin,

      github: form.github,

      placementStatus:
        form.placementStatus as Student["placementStatus"],

      placedCompany: form.placedCompany,

      package: Number(form.package),

      preferredRole: student?.preferredRole || "",

      preferredLocation: student?.preferredLocation || "",

      appliedCompanies: [],
    };

    if (isEdit && student?._id) {

      await updateStudent(
        student._id,
        payload
      );

      alert("✅ Student Updated");

    } else {

      await createStudent(payload);

      alert("✅ Student Added");

    }

    navigate("/admin/students");

  } catch (error) {

    console.error(error);

    alert("❌ Something went wrong");

  } finally {

    setLoading(false);

  }
};


  return (
    <form
  onSubmit={handleSubmit}
  className="space-y-8"
>

      {/* PERSONAL */}

      <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

        <h2 className="mb-6 text-2xl font-bold">
          👤 Personal Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          />

          <input
            name="rollNo"
            placeholder="Roll Number"
            value={form.rollNo}
            onChange={handleChange}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          />

        </div>

      </div>

      {/* ACADEMIC */}

      <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

        <h2 className="mb-6 text-2xl font-bold">
          🎓 Academic Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          >
            {BRANCHES.map((branch) => (
              <option
                key={branch}
                value={branch}
              >
                {branch}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="cgpa"
            step="0.01"
            min="0"
            max="10"
            placeholder="CGPA"
            value={form.cgpa}
            onChange={handleChange}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          />

          <input
            type="number"
            name="backlogs"
            min="0"
            placeholder="Active Backlogs"
            value={form.backlogs}
            onChange={handleChange}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          />

          <input
            type="number"
            name="passingYear"
            placeholder="Passing Year"
            value={form.passingYear}
            onChange={handleChange}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
          />

        </div>

      </div>
    {/* PLACEMENT */}

<div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

  <h2 className="mb-6 text-2xl font-bold">
    💼 Placement Information
  </h2>

  <div className="grid gap-6 md:grid-cols-2">

    <select
      name="placementStatus"
      value={form.placementStatus}
      onChange={handleChange}
      className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
    >
      <option value="Unplaced">Unplaced</option>
      <option value="Placed">Placed</option>
      <option value="Higher Studies">Higher Studies</option>
      <option value="Entrepreneur">Entrepreneur</option>
    </select>

    <input
      name="placedCompany"
      placeholder="Placed Company"
      value={form.placedCompany}
      onChange={handleChange}
      className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
    />

    <input
      type="number"
      name="package"
      placeholder="Package (LPA)"
      value={form.package}
      onChange={handleChange}
      className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
    />

  </div>

</div>

{/* PROFILES */}

<div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

  <h2 className="mb-6 text-2xl font-bold">
    🌐 Profiles
  </h2>

  <div className="grid gap-6 md:grid-cols-2">

    <input
      name="linkedin"
      placeholder="LinkedIn URL"
      value={form.linkedin}
      onChange={handleChange}
      className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
    />

    <input
      name="github"
      placeholder="GitHub URL"
      value={form.github}
      onChange={handleChange}
      className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
    />

  </div>

</div>

<button
  type="submit"
  disabled={loading}
  className="w-full rounded-xl bg-violet-600 py-3 text-lg font-semibold"
>
  {loading
    ? isEdit
      ? "Updating..."
      : "Saving..."
    : isEdit
    ? "Update Student"
    : "Save Student"}
</button>
    </form>
  );
};

export default StudentForm;