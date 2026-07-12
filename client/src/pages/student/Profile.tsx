import { useEffect, useState } from "react";

import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Award,
  BookOpen,
  Building2,
  CalendarDays,
  MapPin,
  Link,
  Code,
  Briefcase,
  Save,
} from "lucide-react";

import type { Student } from "@/types/student";

import {
  getMyProfile,
  updateMyProfile,
} from "@/services/studentApi";

import ProfileInput from "@/components/profile/ProfileInput";
import ProfileEditableInput from "@/components/profile/ProfileEditableInput";
import ProfileCompletion from "@/components/profile/ProfileCompletion";

const Profile = () => {

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [student, setStudent] =
    useState<Partial<Student>>({

      name: "",

      rollNo: "",

      email: "",

      phone: "",

      branch: undefined,

      cgpa: 0,

      backlogs: 0,

      passingYear: 2027,

      placementStatus: "Unplaced",

      skills: [],

      linkedin: "",

      github: "",

      preferredRole: "",

      preferredLocation: "",

    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const data =
        await getMyProfile();

      setStudent(data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {

    setStudent({

      ...student,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSave = async () => {

    try {

      setSaving(true);

      await updateMyProfile({

        phone: student.phone,

        cgpa: Number(student.cgpa),

        backlogs: Number(
          student.backlogs
        ),

        skills:
          typeof student.skills ===
          "string"
            ? (student.skills as string)
                .split(",")
                .map((s) => s.trim())
            : student.skills,

        linkedin:
          student.linkedin,

        github:
          student.github,

        preferredRole:
          student.preferredRole,

        preferredLocation:
          student.preferredLocation,

      });

      alert(
        "Profile Updated Successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Unable to update profile"
      );

    } finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (

      <div className="flex h-[70vh] items-center justify-center">

        <h1 className="text-3xl font-bold">

          Loading Profile...

        </h1>

      </div>

    );

  }

  const completedFields = [

    student.phone,

    student.cgpa &&
      student.cgpa > 0,

    student.skills &&
      student.skills.length > 0,

    student.linkedin,

    student.github,

    student.preferredRole,

    student.preferredLocation,

  ];

  const completion = Math.round(

    (completedFields.filter(Boolean).length /
      completedFields.length) *
      100

  );

  return (

    <div className="mx-auto max-w-7xl space-y-8">

      {/* Hero */}

      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-r from-violet-700/20 via-fuchsia-700/20 to-cyan-700/20 p-10">

        <h1 className="text-4xl font-bold">

          My Profile

        </h1>

        <p className="mt-3 text-lg text-zinc-400">

          Keep your placement profile updated.
          Companies will view this information
          during recruitment.

        </p>

      </div>

      <ProfileCompletion
        completion={completion}
      />

      <div className="grid gap-8 lg:grid-cols-2">

        {/* Personal Information */}

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

          <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold">

            <User className="text-violet-400" />

            Personal Information

          </h2>

          <div className="space-y-5">

            <ProfileInput
              icon={<User size={18} />}
              label="Full Name"
              value={student.name}
            />

            <ProfileInput
              icon={<GraduationCap size={18} />}
              label="Roll Number"
              value={student.rollNo}
            />

            <ProfileInput
              icon={<Mail size={18} />}
              label="Email"
              value={student.email}
            />

            <ProfileInput
              icon={<Building2 size={18} />}
              label="Branch"
              value={student.branch}
            />

            <ProfileInput
              icon={<CalendarDays size={18} />}
              label="Passing Year"
              value={student.passingYear}
            />

            <ProfileInput
              icon={<Award size={18} />}
              label="Placement Status"
              value={student.placementStatus}
            />

          </div>

        </div>

        {/* Placement Profile */}

        <div className="rounded-3xl border border-zinc-800 bg-[#18181B] p-8">

          <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold">

            <GraduationCap className="text-cyan-400" />

            Placement Profile

          </h2>

          <div className="space-y-5">            <ProfileEditableInput
              icon={<Phone size={18} />}
              label="Phone"
              name="phone"
              value={student.phone}
              onChange={handleChange}
            />

            <ProfileEditableInput
              icon={<Award size={18} />}
              label="CGPA"
              name="cgpa"
              type="number"
              value={student.cgpa}
              onChange={handleChange}
            />

            <ProfileEditableInput
              icon={<BookOpen size={18} />}
              label="Backlogs"
              name="backlogs"
              type="number"
              value={student.backlogs}
              onChange={handleChange}
            />

            <ProfileEditableInput
              icon={<Briefcase size={18} />}
              label="Preferred Role"
              name="preferredRole"
              value={student.preferredRole}
              onChange={handleChange}
            />

            <ProfileEditableInput
              icon={<MapPin size={18} />}
              label="Preferred Location"
              name="preferredLocation"
              value={student.preferredLocation}
              onChange={handleChange}
            />

            <ProfileEditableInput
              icon={<Link size={18} />}
              label="LinkedIn"
              name="linkedin"
              value={student.linkedin}
              onChange={handleChange}
            />

            <ProfileEditableInput
              icon={<Code size={18} />}
              label="GitHub"
              name="github"
              value={student.github}
              onChange={handleChange}
            />

            <div>

              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-400">

                <BookOpen size={18} />

                Skills (comma separated)

              </label>

              <textarea
                rows={4}
                name="skills"
                value={
                  Array.isArray(student.skills)
                    ? student.skills.join(", ")
                    : student.skills
                }
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white outline-none transition focus:border-violet-500"
              />

            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 py-4 text-lg font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >

              <Save size={20} />

              {saving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

};

export default Profile;