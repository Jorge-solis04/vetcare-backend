import {z} from 'zod';

export const registerSchema = z.object({
    email: z.string().email({message: 'Email invalido'}),
    password: z.string().min(6, {message: 'La contraseña debe tener al menos 6 caracteres'}),
    name: z.string().min(2, {message: 'El nombre debe tener al menos 2 caracteres'}),
    role: z.enum(['ADMIN', 'VET', 'RECEPTIONIST']).optional(),

})

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'La contraseña es requerida' }),
});