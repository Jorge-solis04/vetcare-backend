import prisma from '../prisma/client.js';
import { Prisma } from '@prisma/client';
import type { Request, Response } from 'express';
import * as appointmentService from '../services/appointment.service.js';
import { createAppointmentSchema, updateAppointmentSchema } from '../controllers/appointment.schemas.js';
import { ZodError } from 'zod';

interface AppointmentFilters {
  vetId?: string;
  petId?: string;
  date?: string;
  id?: string;
}

export const getAppointmentById = async (id: string) => {
  return await prisma.appointment.findUnique({
    where: { id },
    
  });
};

export const getAppointments = async (filters: AppointmentFilters) => {
  const where: Prisma.AppointmentWhereInput = {};

  if (filters.vetId) {
    where.vetId = filters.vetId;
  }

  if (filters.petId) {
    where.petId = filters.petId;
  }

  if (filters.date) {
    const [year, month, day] = filters.date.split('-').map(Number);
    
    const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
    const endOfDay = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

    where.date = {
      gte: startOfDay,
      lte: endOfDay,
    };
  }

  return await prisma.appointment.findMany({
    where,
    include: {
      pet: {
        select: {
          id: true,
          name: true,
          species: true,
          breed: true,
          owner: {
            select: {
              id: true,
              name: true,
              phone: true,
            },
          },
        },
      },
      vet: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
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
};

