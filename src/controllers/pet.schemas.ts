import { z } from 'zod';

export const createPetSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  species: z.string().min(1, 'La especie es requerida'), 
  breed: z.string().min(1, 'La raza es requerida'),      
  birthDate: z.coerce.date(), 
  ownerId: z.string().uuid('Debe ser un ID de dueño válido'), 
});

export const updatePetSchema = z.object({
  name: z.string().optional(),
  species: z.string().optional(),
  breed: z.string().optional(),
  birthDate: z.coerce.date().optional(),
  ownerId: z.string().uuid('Debe ser un ID de dueño válido').optional(),
});