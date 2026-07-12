import { Request, Response } from "express";

import { ApiResponse } from "../utils/ApiResponse";

import {
  registerService,
  loginService,
} from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await registerService(req.body);

    res.status(201).json(
      new ApiResponse(
        true,
        "Registration successful",
        data
      )
    );

  } catch (error: any) {

    res.status(400).json(
      new ApiResponse(
        false,
        error.message
      )
    );

  }

};

export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const data =
      await loginService(req.body);

    res.json(
      new ApiResponse(
        true,
        "Login successful",
        data
      )
    );

  } catch (error: any) {

    res.status(401).json(
      new ApiResponse(
        false,
        error.message
      )
    );

  }

};