import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schemas.js";

import { loginUser, registerUser } from "../services/auth.service.js";

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const user = await registerUser(validatedData);

    return res.status(201).json({
      message: "usuario registrado exitosamente",
      user,
    });
  } catch (e: any) {
    if (e.code === "P2002") {
      return res
        .status(409)
        .json({
          message: "El email ingresado ya existe. Intenta con uno nuevo",
        });
    }

    return res.status(400).json({
      message: e.message,
    });
  }
};

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);

    const { token } = await loginUser(validatedData);
    return res.status(200).json({ token, message: "Login exitoso" });
  } catch (e: any) {
    return res.status(401).json({
      message: e.message,
    });
  }
};
