import { z } from 'zod';
import { AppointmentStatus } from '@prisma/client'; 

export const createAppointmentSchema = z.object({
  date: z.coerce.date().refine((date) => date > new Date(), {
    message: "La cita debe programarse en el futuro",
  }),
  petId: z.string().uuid('ID de mascota inválido'),
  vetId: z.string().uuid('ID de veterinario inválido'),
});

export const updateAppointmentSchema = z.object({
  date: z.coerce.date().refine((date) => date > new Date(), {
    message: "La nueva fecha debe ser en el futuro",
  }).optional(),

  status: z.nativeEnum(AppointmentStatus).optional(),
  vetId: z.string().uuid().optional(),
});