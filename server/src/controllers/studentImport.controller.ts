import { Request, Response } from "express";
import { importStudentsService } from "../services/studentImport.service";

export const importStudents = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Excel file is required",
      });
    }

    const result = await importStudentsService(req.file.path);

    res.status(200).json({
      success: true,
      message: "Students imported successfully",
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};