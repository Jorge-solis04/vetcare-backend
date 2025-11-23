import type { Request, Response } from 'express';
import * as vetService from '../services/vet.service';
import { createVetSchema, updateVetSchema } from './vet.schemas';
import { Prisma } from '@prisma/client';

export const createVetHandler = async (req: Request, res: Response) => {
  try {
    const data = createVetSchema.parse(req.body);
    const vet = await vetService.createVet(data);
    res.status(201).json(vet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllVetsHandler = async (req: Request, res: Response) => {
  try {
    const vets = await vetService.getAllVets();
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener veterinarios' });
  }
};

export const getVetByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID requerido' });
    const vet = await vetService.getVetById(id);
    if (!vet) return res.status(404).json({ message: 'Veterinario no encontrado' });
    res.status(200).json(vet);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el veterinario' });
  }
};

export const updateVetHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID requerido' });
    const data = updateVetSchema.parse(req.body);
    const updatedVet = await vetService.updateVet(id, data);
    res.status(200).json(updatedVet);
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Veterinario no encontrado' });
    }
    res.status(400).json({ message: error.message });
  }
};

export const deleteVetHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID requerido' });
    await vetService.deleteVet(id);
    res.status(200).json({ message: 'Veterinario eliminado correctamente' });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Veterinario no encontrado' });
    }
    res.status(500).json({ message: 'Error al eliminar' });
  }
};