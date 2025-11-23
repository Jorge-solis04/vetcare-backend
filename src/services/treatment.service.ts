import prisma from "../prisma/client.js";
import { Prisma } from "@prisma/client";

export const getTreatmentsByPet = async (petId: string) => {
  return await prisma.treatment.findMany({
    where: { petId }, 
    orderBy: { start: 'desc' }, 
    include: {
      pet: { select: { name: true } }
    }
  });
};

export const createTreatment = async (data: Prisma.TreatmentUncheckedCreateInput) => {
  return await prisma.treatment.create({
    data,
  });
};

export const updateTreatment = async (id: string, data: Prisma.TreatmentUpdateInput) => {
    return await prisma.treatment.update({
        where: { id },
        data,
    })
}

export const deleteTreatment = async (id: string) => {
  return await prisma.treatment.delete({
    where: { id },
  });
};