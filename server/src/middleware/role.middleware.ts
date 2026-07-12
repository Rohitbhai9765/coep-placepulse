import { Request, Response, NextFunction } from "express";

export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (
    req.user?.role !== "admin"
  ) {

    return res.status(403).json({
      success: false,
      message: "Admins only",
    });

  }

  next();

};

export const studentOnly = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (
    req.user?.role !== "student"
  ) {

    return res.status(403).json({
      success: false,
      message: "Students only",
    });

  }

  next();

};