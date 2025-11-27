import type { Request, Response } from "express";
import * as apptService from "../services/appointment.service.js";
import { z } from 'zod';
import { AppointmentStatus } from "@prisma/client";

export const createAppointmentSchema = z.object({
  date: z.coerce.date(),
  petId: z.string().uuid("ID de mascota inválido"),
  vetId: z.string().uuid("ID de veterinario inválido"),
  status: z.nativeEnum(AppointmentStatus).default(AppointmentStatus.SCHEDULED),
});

export const updateAppointmentSchema = z.object({
  date: z.coerce.date().optional(),
  status: z.nativeEnum(AppointmentStatus).optional(),
});

export const getAppointmentsHandler = async (req: Request, res: Response) => {
  try {
    const { vetId, petId, date } = req.query;

    const appointments = await apptService.getAppointments({
      vetId: vetId as string,
      petId: petId as string,
      date: date as string,
    });

    if (appointments.length === 0) {
      return res.status(200).json({
        message: 'No hay citas para los filtros aplicados',
        data: []
      });
    }

    return res.status(200).json(appointments);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    return res.status(500).json({ message: 'Error al obtener las citas' });
  }
};

export const getAppointmentByIdHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ message: 'ID de cita es requerido' });
    }

    const appointment = await apptService.getAppointmentById(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    
    return res.status(200).json(appointment);
  } catch (error) {
    console.error('Error al obtener cita:', error);
    return res.status(500).json({ message: 'Error al obtener la cita' });
  }
};

export const createAppointmentHandler = async (req: Request, res: Response) => {
  try {
    const data = createAppointmentSchema.parse(req.body);
    const newAppt = await apptService.createAppointment(data);
    return res.status(201).json(newAppt);
  } catch (error: any) {
    if (error.code === 'P2003') return res.status(400).json({ message: 'Mascota o Veterinario no existen' });
    return res.status(400).json({ message: error.message || error });
  }
};

export const updateAppointmentHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = updateAppointmentSchema.parse(req.body);
    if (!id) {
        return res.status(400).json({ message: 'ID de cita es requerido' });
    }
    const updatedAppt = await apptService.updateAppointment(id, data);
    return res.status(200).json(updatedAppt);
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar cita' });
  }
};

export const deleteAppointmentHandler = async (req: Request, res: Response) => {
  try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'ID de cita es requerido' });
    }
      await apptService.deleteAppointment(id);
      return res.status(204).send();
  } catch (error) {
      return res.status(500).json({ message: 'Error al cancelar cita' });
  }
}
