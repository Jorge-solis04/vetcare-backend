import type { Request, Response } from 'express';
import * as ownerService from '../services/owner.service';
import { createOwnerSchema, updateOwnerSchema } from './owner.schemas';
import { Prisma } from '@prisma/client';

export const createOwnerHandler = async (req: Request, res: Response) => {
  try {
    const data = createOwnerSchema.parse(req.body);
    const owner = await ownerService.createOwner(data);
    res.status(201).json(owner);
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ message: 'El email ya está en uso' });
    }
    res.status(400).json({ message: error.message });
  }
};

export const getAllOwnersHandler = async (req: Request, res: Response) => {
  try {
    const owners = await ownerService.getAllOwners();
    res.status(200).json(owners);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los dueños' });
  }
};

export const getOwnerByIdHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID requerido' });
    const owner = await ownerService.getOwnerById(id);
    if (!owner) {
      return res.status(404).json({ message: 'Dueño no encontrado' });
    }
    res.status(200).json(owner);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el dueño' });
  }
};

export const updateOwnerHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID requerido' });
    const data = updateOwnerSchema.parse(req.body);

    const updatedOwner = await ownerService.updateOwner(id, data);
    res.status(200).json(updatedOwner);
  } catch (error: any) {

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Dueño no encontrado' });
    }
    res.status(400).json({ message: error.message });
  }
};

export const deleteOwnerHandler = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'ID requerido' });
    const deletedOwner = await ownerService.deleteOwner(id);
    res.status(200).json(deletedOwner);
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Dueño no encontrado' });
    }
    res.status(500).json({ message: 'Error al eliminar el dueño' });
  }
};