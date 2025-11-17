import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import type { JwtPayload } from "../types/express.d.ts";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No se envio el token de autenticacion" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Token de autenticacion no proporcionado" });
  }

  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = verifiedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token de autenticacion invalido" });
  }
};

//Este es un constructo de middlewares, sirve para mandar un rol especifico desde la ruta, lo que ayuda que solo ciertos roles tengas acceso a ciertas rutas
export const authorizeRole = (roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "No autorizado: Usuario no encontrado" });
    }

    const userRole = req.user.role;

    if(roles.includes(userRole)) {
        next()
    } else {
        return res.status(403).json({ message: "No autorizado: Rol insuficiente" });
    }
  };
};
