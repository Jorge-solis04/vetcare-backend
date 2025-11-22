import prisma from '../prisma/client'
import { Prisma } from '@prisma/client'

export const getAllPets = async() =>{
    return await prisma.pet.findMany({
        include:{
            owner: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }
    })
}

export const getPetById = async (id: string) => {
  return await prisma.pet.findUnique({
    where: { id },
    include: {
      owner: true, 
      
    },
  });
};

export const createPet = async (data: Prisma.PetUncheckedCreateInput) => {
  return await prisma.pet.create({
    data,
  });
};

export const updatePet = async (id: string, data: Prisma.PetUpdateInput) => {
  return await prisma.pet.update({
    where: { id },
    data,
  });
};

export const deletePet = async (id: string) => {
  return await prisma.pet.delete({
    where: { id },
  });
};