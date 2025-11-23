import type { Request, Response } from "express";
import * as apptService from "../services/appointment.service";
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
    const filters = {
      vetId: req.query.vetId as string,
      petId: req.query.petId as string,
      date: req.query.date as string,
    };
    const appointments = await apptService.getAppointments(filters);
    return res.status(200).json(appointments);
  } catch (error: any) {
    return res.status(500).json({ message: "Error al obtener citas" });
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
