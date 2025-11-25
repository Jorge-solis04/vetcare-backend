import { Prisma } from "@prisma/client";
import prisma from "../prisma/client.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (data: Prisma.UserCreateInput) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const userData = {
    ...data,
    password: hashedPassword,
  };

  const user = await prisma.user.create({
    data: userData,
  });

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const loginUser = async (data: {
    email:string;
    password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });
  
  if (!user) {
    throw new Error("No se encontró el usuario");
  }
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Email o contraseña inválidos");
  }

  if (!JWT_SECRET) {
    throw new Error("nO Existe el jwt como por que no existiria");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
};
