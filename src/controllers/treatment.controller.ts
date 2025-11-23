import type { Request, Response } from "express";
import * as treatmentService from "../services/treatment.service.js";
import { createTreatmentSchema, updateTreatmentSchema } from "./treatment.schemas";

export const getTreatmentsByPetHandler = async (req: Request, res: Response) => {
  try {
    const { petId } = req.params;
    if(!petId){
        return res.status(400).json({ message: 'ID de mascota es requerido' });
    }
    const treatments = await treatmentService.getTreatmentsByPet(petId);
    return res.status(200).json(treatments);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener tratamientos' });
  }
};

export const createTreatmentHandler = async (req: Request, res: Response) => {
  try {
    const data = createTreatmentSchema.parse(req.body);
    const treatment = await treatmentService.createTreatment(data);
    return res.status(201).json(treatment);
  } catch (error: any) {
    if (error.code === 'P2003') {
      return res.status(400).json({ message: 'La mascota especificada no existe' });
    }
    return res.status(400).json({ message: error.message || error });
  }
};

export const updateTreatmentHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = updateTreatmentSchema.parse(req.body);
    if(!id){
        return res.status(400).json({ message: 'ID de tratamiento es requerido' });
    }
    const updated = await treatmentService.updateTreatment(id, data);
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar tratamiento' });
  }
};

export const deleteTreatmentHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({ message: 'ID de tratamiento es requerido' });
    }
    await treatmentService.deleteTreatment(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar tratamiento' });
  }
};