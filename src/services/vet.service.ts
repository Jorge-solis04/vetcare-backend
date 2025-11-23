import { Prisma } from '@prisma/client';
import prisma from '../prisma/client';

export const createVet = async (data: Prisma.VetCreateInput) => {
  return prisma.vet.create({ data });
};

export const getAllVets = async () => {
  return prisma.vet.findMany();
};

export const getVetById = async (id: string) => {
  return prisma.vet.findUnique({
    where: { id },
  });
};

export const updateVet = async (id: string, data: Prisma.VetUpdateInput) => {
  return prisma.vet.update({
    where: { id },
    data,
  });
};

export const deleteVet = async (id: string) => {
  return prisma.vet.delete({
    where: { id },
  });
};