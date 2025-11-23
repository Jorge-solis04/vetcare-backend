import { Router } from 'express';
import { authMiddleware, authorizeRole } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';
import {
  createAppointmentHandler,
  deleteAppointmentHandler,
  getAppointmentsHandler,
  updateAppointmentHandler,
} from '../controllers/appointment.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/',
  /* 
    #swagger.tags = ['Appointments']
    #swagger.description = 'Obtener todas las citas con filtros opcionales'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['vetId'] = {
      in: 'query',
      description: 'ID del veterinario para filtrar',
      required: false,
      type: 'string'
    }
    #swagger.parameters['petId'] = {
      in: 'query',
      description: 'ID de la mascota para filtrar',
      required: false,
      type: 'string'
    }
    #swagger.parameters['date'] = {
      in: 'query',
      description: 'Fecha para filtrar (formato: YYYY-MM-DD)',
      required: false,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Citas obtenidas exitosamente',
      schema: [{
        id: 'appointment123',
        date: '2024-01-15T10:00:00.000Z',
        status: 'SCHEDULED',
        petId: 'pet123',
        vetId: 'vet123',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }]
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
  */
  getAppointmentsHandler
);

router.post('/',
  /* 
    #swagger.tags = ['Appointments']
    #swagger.description = 'Crear una nueva cita'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos de la cita',
      required: true,
      schema: {
        date: '2024-01-15T10:00:00.000Z',
        petId: 'pet123-uuid-format',
        vetId: 'vet123-uuid-format',
        status: 'SCHEDULED'
      }
    }
    #swagger.responses[201] = {
      description: 'Cita creada exitosamente'
    }
    #swagger.responses[400] = {
      description: 'Error de validación - petId o vetId inválidos'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente - Solo ADMIN y RECEPTIONIST'
    }
  */
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST]),
  createAppointmentHandler
);

router.put('/:id',
  /* 
    #swagger.tags = ['Appointments']
    #swagger.description = 'Actualizar una cita (reagendar o cambiar estado)'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID de la cita',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos a actualizar (todos opcionales)',
      required: true,
      schema: {
        date: '2024-01-15T14:00:00.000Z',
        status: 'COMPLETED'
      }
    }
    #swagger.responses[200] = {
      description: 'Cita actualizada exitosamente'
    }
    #swagger.responses[400] = {
      description: 'Error de validación o ID no proporcionado'
    }
    #swagger.responses[404] = {
      description: 'Cita no encontrada'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente - ADMIN, RECEPTIONIST o VET'
    }
  */
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST, Role.VET]),
  updateAppointmentHandler
);

router.delete('/:id',
  /* 
    #swagger.tags = ['Appointments']
    #swagger.description = 'Cancelar/eliminar una cita definitivamente'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID de la cita',
      required: true,
      type: 'string'
    }
    #swagger.responses[204] = {
      description: 'Cita eliminada exitosamente'
    }
    #swagger.responses[400] = {
      description: 'ID de cita no proporcionado'
    }
    #swagger.responses[404] = {
      description: 'Cita no encontrada'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente - Solo ADMIN y RECEPTIONIST'
    }
  */
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST]),
  deleteAppointmentHandler
);

export default router;