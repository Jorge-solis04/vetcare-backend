import { z } from 'zod';

export const createOwnerSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido' }),
  phone: z
    .string()
    .min(10, { message: 'El teléfono debe tener al menos 10 dígitos' }),
  email: z.string().email({ message: 'Email inválido' }),
});

export const updateOwnerSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  email: z.string().email().optional(),
});