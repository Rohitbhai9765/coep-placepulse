import * as XLSX from "xlsx";
import fs from "fs";
const bcrypt: any = require("bcrypt");

import Student from "../models/Student.model";
import User from "../models/User.model";

export const importStudentsService = async (
  filePath: string
) => {
  let imported = 0;
  let skipped = 0;
  const duplicates: string[] = [];

  try {
    const workbook = XLSX.readFile(filePath);

    const sheetName = workbook.SheetNames[0];

    const worksheet = workbook.Sheets[sheetName];

    const rows: any[] = XLSX.utils.sheet_to_json(
      worksheet,
      {
        defval: "",
      }
    );

    for (const row of rows) {
      try {
        const rollNo = String(
          row["Roll Number"] || ""
        ).trim();

        const name = String(
          row["Name"] || ""
        ).trim();

        const email = String(
          row["Email"] || ""
        )
          .trim()
          .toLowerCase();

        const branch = String(
          row["Branch"] || "Civil"
        ).trim();

        const passingYear = Number(
          row["Passing Year"] || 2027
        );

        const phone = String(
          row["Phone"] || ""
        ).trim();

        // Skip incomplete rows
        if (
          !rollNo ||
          !name ||
          !email ||
          !phone
        ) {
          skipped++;
          continue;
        }

        // Check duplicate student
        const existingStudent =
          await Student.findOne({
            $or: [
              { rollNo },
              { email },
            ],
          });

        if (existingStudent) {
          skipped++;
          duplicates.push(email);
          continue;
        }

        // Check duplicate user
        const existingUser =
          await User.findOne({
            email,
          });

        if (existingUser) {
          skipped++;
          duplicates.push(email);
          continue;
        }

        // Create Student
        const student =
          await Student.create({
            name,
            rollNo,
            email,
            phone,
            branch,
            passingYear,
            cgpa: 0,
            backlogs: 0,
            placementStatus: "Unplaced",
            placedCompany: "",
            package: 0,
            linkedin: "",
            github: "",
            skills: [],
            preferredRole: "",
            preferredLocation: "",
            resumeUrl: "",
            applications: [],
          });

        // Password = Roll Number
        const hashedPassword =
          await bcrypt.hash(
            rollNo,
            10
          );

        // Create User
        await User.create({
          name,
          email,
          password: hashedPassword,
          role: "student",
          studentId: student._id,
        });

        imported++;

      } catch (error: any) {

        console.error(
          `Error importing ${row["Email"]}:`,
          error.message
        );

        skipped++;
      }
    }

    return {
      imported,
      skipped,
      duplicates,
    };

  } finally {

    // Always delete uploaded file
    try {

      if (fs.existsSync(filePath)) {

        fs.unlinkSync(filePath);

        console.log(
          "🗑 Uploaded Excel deleted successfully."
        );

      }

    } catch (error) {

      console.error(
        "Error deleting uploaded Excel:",
        error
      );

    }
  }
};