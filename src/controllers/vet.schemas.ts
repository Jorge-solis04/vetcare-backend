import { z } from 'zod';

export const createVetSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido' }),
  specialty: z.string().min(2, { message: 'La especialidad es requerida' }),

  isActive: z.boolean().optional(),
});

export const updateVetSchema = z.object({
  name: z.string().min(2).optional(),
  specialty: z.string().min(2).optional(),
  isActive: z.boolean().optional(),
});