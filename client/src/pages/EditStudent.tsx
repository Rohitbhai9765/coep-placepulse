import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import type { Student } from "@/types/student";

import StudentForm from "@/components/students/StudentForm";

import { getStudent } from "@/services/studentApi";

const EditStudent = () => {

  const { id } = useParams();

  const [student, setStudent] =
    useState<Student | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (id) {

      fetchStudent(id);

    }

  }, [id]);

  const fetchStudent = async (
    studentId: string
  ) => {

    try {

      const data = await getStudent(
        studentId
      );

      setStudent(data);

    } catch (error) {

      console.error(error);

      alert("Unable to load student.");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <h2 className="text-xl">
        Loading...
      </h2>
    );

  }

  if (!student) {

    return (
      <h2 className="text-xl">
        Student not found.
      </h2>
    );

  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-5xl font-bold">
          Edit Student
        </h1>

        <p className="mt-2 text-zinc-500">
          Update student information.
        </p>

      </div>

      <StudentForm student={student} />

    </div>

  );

};

export default EditStudent;