import type {Request, Response} from 'express';
import * as petService from '../services/pet.services.js';
import { createPetSchema, updatePetSchema } from './pet.schemas';

export const getPetsHanldler = async(req: Request, res: Response) => {
    try {
        const pets = await petService.getAllPets();
        res.status(200).json(pets);
    } catch (e){
        return res.status(500).json({message: 'Error al obtener a los perrillos'});
    }
}

export const getPetByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if(!id){
        return res.status(400).json({ message: 'ID de mascota es requerido' });
    }

    const pet = await petService.getPetById(id);
    
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    
    return res.status(200).json(pet);
  } catch (error) {
    return res.status(500).json({ message: 'Error al buscar la mascota' });
  }
};

export const createPetHandler = async (req: Request, res: Response) => {
  try {
    const data = createPetSchema.parse(req.body);
    const newPet = await petService.createPet(data);
    return res.status(201).json(newPet);
  } catch (error: any) {
    if (error.code === 'P2003') { 
      return res.status(400).json({ message: 'El ownerId proporcionado no existe' });
    }
    return res.status(400).json({ message: error.message || error });
  }
};

export const updatePetHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = updatePetSchema.parse(req.body);
    
    if(!id){
        return res.status(400).json({ message: 'ID de mascota es requerido' });
    }

    const updatedPet = await petService.updatePet(id, data);
    return res.status(200).json(updatedPet);
  } catch (error: any) {
    if (error.code === 'P2025') { 
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    return res.status(400).json({ message: error.message || error });
  }
};

export const deletePetHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if(!id){
        return res.status(400).json({ message: 'ID de mascota es requerido' });
    }

    await petService.deletePet(id);
    return res.status(204).send(); 
  } catch (error: any) {
    // Log completo del error para debug
    console.error('Error al eliminar mascota:', error);
    
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }
    
    // Error de constraint (probablemente tiene tratamientos o citas relacionadas)
    if (error.code === 'P2003') {
      return res.status(400).json({ 
        message: 'No se puede eliminar la mascota porque tiene registros relacionados (tratamientos o citas)' 
      });
    }
    
    return res.status(500).json({ 
      message: 'Error al eliminar mascota',
      error: error.message // Enviar el mensaje de error al cliente
    });
  }
};