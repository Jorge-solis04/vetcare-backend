import type { Request, Response } from 'express';
import * as vaccineService from '../services/vaccine.service';
import { createVaccineSchema, updateVaccineSchema } from './vaccine.schemas';
import { Prisma } from '@prisma/client';

export const createVaccineHandler = async (req: Request, res: Response) => {
  try {
    const data = createVaccineSchema.parse(req.body);
    const vaccine = await vaccineService.createVaccine(data);
    res.status(201).json(vaccine);
  } catch (error: any) {

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
      return res.status(404).json({ message: 'La mascota especificada no existe' });
    }
    res.status(400).json({ message: error.message });
  }
};

export const getVaccinesHandler = async (req: Request, res: Response) => {
  try {
 
    const petId = req.query.petId as string;
    const vaccines = await vaccineService.getVaccines(petId);
    res.status(200).json(vaccines);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener vacunas' });
  }
};

export const getVaccineByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID requerido' });
    const vaccine = await vaccineService.getVaccineById(id);
    if (!vaccine) return res.status(404).json({ message: 'Vacuna no encontrada' });
    res.status(200).json(vaccine);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener vacuna' });
  }
};

export const updateVaccineHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID requerido' });
    const data = updateVaccineSchema.parse(req.body);
    const updated = await vaccineService.updateVaccine(id, data);
    res.status(200).json(updated);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVaccineHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID requerido' });
    await vaccineService.deleteVaccine(id);
    res.status(200).json({ message: 'Vacuna eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar vacuna' });
  }
};