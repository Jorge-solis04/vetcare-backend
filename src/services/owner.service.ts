import { Prisma } from '@prisma/client';
import prisma from '../prisma/client';

export const createOwner = async (data: Prisma.OwnerCreateInput) => {
  return prisma.owner.create({
    data,
  });
};

export const getAllOwners = async () => {
  return prisma.owner.findMany();
};

export const getOwnerById = async (id: string) => {
  return prisma.owner.findUnique({
    where: { id },
  });
};

export const updateOwner = async (
  id: string,
  data: Prisma.OwnerUpdateInput
) => {
  return prisma.owner.update({
    where: { id },
    data,
  });
};

export const deleteOwner = async (id: string) => {
  return prisma.owner.delete({
    where: { id },
  });
};