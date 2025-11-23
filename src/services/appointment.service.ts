import prisma from '../prisma/client';
import { Prisma } from '@prisma/client';

interface AppointmentFilters {
  vetId?: string;
  petId?: string;
  date?: string; 
}

export const getAppointments = async (filters: AppointmentFilters) => {
  const where: Prisma.AppointmentWhereInput = {};

  if (filters.vetId) where.vetId = filters.vetId;

  if (filters.petId) where.petId = filters.petId;

  
  if (filters.date) {
    const startOfDay = new Date(filters.date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(filters.date);
    endOfDay.setHours(23, 59, 59, 999);

    where.date = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  return await prisma.appointment.findMany({
    where,
    include: {
      pet: { select: { name: true, species: true } }, 
      vet: { select: { name: true } },
      
    },
    orderBy: { date: 'asc' }, 
  });
};

export const createAppointment = async (data: Prisma.AppointmentUncheckedCreateInput) => {
  
  return await prisma.appointment.create({ data });
};

export const updateAppointment = async (id: string, data: Prisma.AppointmentUpdateInput) => {
  return await prisma.appointment.update({
    where: { id },
    data,
  });
};

export const deleteAppointment = async (id: string) => {
    return await prisma.appointment.delete({ where: { id } });
}