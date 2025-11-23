import { z } from 'zod';

export const createTreatmentSchema = z.object({
description: z.string().min(5, 'La descripción debe ser detallada'),
  start: z.coerce.date(), // Convierte string a fecha
  end: z.coerce.date().optional(), // Puede ser indefinido (tratamiento crónico)
  petId: z.string().uuid('ID de mascota inválido'),
}).refine((data) => {
    if(data.end && data.end < data.start){
        return false
    }
    return true
}, {
    message: "La fecha de finalización no puede ser anterior a la fecha de inicio",
    path: ["end"],
})

export const updateTreatmentSchema = z.object({
  description: z.string().optional(),
  start: z.coerce.date().optional(),
  end: z.coerce.date().optional(),
});