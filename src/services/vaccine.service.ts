import { Prisma } from '@prisma/client';
import prisma from '../prisma/client';

export const createVaccine = async (data: Prisma.VaccineCreateManyInput) => {
  return prisma.vaccine.create({
    data,
  });
};

export const getVaccines = async (petId?: string) => {
  if (petId) {
    return prisma.vaccine.findMany({
      where: { petId },
      include: { pet: true },
    });
  }
  return prisma.vaccine.findMany({
    include: { pet: true },
  });
};

export const getVaccineById = async (id: string) => {
  return prisma.vaccine.findUnique({
    where: { id },
    include: { pet: true },
  });
};

export const updateVaccine = async (id: string, data: Prisma.VaccineUpdateInput) => {
  return prisma.vaccine.update({
    where: { id },
    data,
  });
};

export const deleteVaccine = async (id: string) => {
  return prisma.vaccine.delete({
    where: { id },
  });
};