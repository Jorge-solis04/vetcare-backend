import { Router } from 'express';
import { authMiddleware, authorizeRole } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';
import {
  createAppointmentHandler,
  deleteAppointmentHandler,
  getAppointmentsHandler,
  getAppointmentByIdHandler,
  updateAppointmentHandler,
} from '../controllers/appointment.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/',
  /* 
    #swagger.tags = ['Appointments']
    #swagger.description = 'Obtener todas las citas con filtros opcionales'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  getAppointmentsHandler
);

router.get('/:id',
  /* 
    #swagger.tags = ['Appointments']
    #swagger.description = 'Obtener una cita específica por ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID de la cita',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Cita encontrada'
    }
    #swagger.responses[404] = {
      description: 'Cita no encontrada'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
  */
  getAppointmentByIdHandler
);

router.post('/',
  /* 
    #swagger.tags = ['Appointments']
    #swagger.description = 'Crear una nueva cita'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST]),
  createAppointmentHandler
);

router.put('/:id',
  /* 
    #swagger.tags = ['Appointments']
    #swagger.description = 'Actualizar una cita'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST, Role.VET]),
  updateAppointmentHandler
);

router.delete('/:id',
  /* 
    #swagger.tags = ['Appointments']
    #swagger.description = 'Cancelar/eliminar una cita'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST]),
  deleteAppointmentHandler
);

export default router;