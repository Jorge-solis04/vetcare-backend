import { z } from 'zod';

export const createVaccineSchema = z.object({
  name: z.string().min(2, { message: 'El nombre es requerido' }),

  petId: z.string().uuid({ message: 'ID de mascota inválido' }),

  // Preprocesamos entrada (string -> Date) y luego validamos con z.date()
  appliedDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    return arg;
  }, z.date({ error: 'Formato de fecha inválido' })),

  nextDose: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    return arg;
  }, z.date()).optional(),
})

.refine((data) => {
  return data.appliedDate !== undefined && data.appliedDate !== null;
}, {
  message: 'La fecha de aplicación es requerida',
  path: ['appliedDate']
})
.refine((data) => {
  if (data.nextDose && data.appliedDate) {
    return data.nextDose > data.appliedDate;
  }
  return true;
}, {
  message: "La fecha de la próxima dosis debe ser posterior a la fecha de aplicación",
});

export const updateVaccineSchema = z.object({
  name: z.string().min(2).optional(),
  appliedDate: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    return arg;
  }, z.date()).optional(),
  nextDose: z.preprocess((arg) => {
    if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    return arg;
  }, z.date()).optional(),
});