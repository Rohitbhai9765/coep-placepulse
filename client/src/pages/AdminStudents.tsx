import { useEffect, useState } from "react";

import type { Student } from "@/types/student";

import StudentForm from "@/components/students/StudentForm";
import StudentTable from "@/components/students/StudentTable";

import { getStudents } from "@/services/studentApi";

const AdminStudents = () => {

  const [students, setStudents] =
    useState<Student[]>([]);

  const fetchStudents = async () => {

    try {

      const data = await getStudents();

      setStudents(data);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchStudents();

  }, []);

  return (

    <div className="space-y-10">

      <div>

        <h1 className="text-5xl font-bold">
          Students
        </h1>

        <p className="mt-2 text-zinc-500">
          Manage placement students.
        </p>

      </div>

      <StudentForm />

      <StudentTable
        students={students}
        refresh={fetchStudents}
      />

    </div>

  );

};

export default AdminStudents;