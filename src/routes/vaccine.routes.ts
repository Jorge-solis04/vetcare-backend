// src/routes/vaccine.routes.ts
import { Router } from 'express';
import { Role } from '@prisma/client';
import { authMiddleware as authenticateToken, authorizeRole } from '../middleware/auth.middleware';
import {
  createVaccineHandler,
  getVaccinesHandler,
  getVaccineByIdHandler,
  updateVaccineHandler,
  deleteVaccineHandler,
} from '../controllers/vaccine.controller';

const router = Router();

router.post(
  '/',
  /*
    #swagger.tags = ['Vaccines']
    #swagger.description = 'Crear una nueva vacuna (registro de aplicación) <br><b>Roles permitidos:</b> ADMIN, VET'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos de la vacuna',
      required: true,
      schema: {
        name: 'Rabia',
        appliedDate: '2024-07-01T10:00:00.000Z',
        nextDose: '2025-07-01T10:00:00.000Z',
        petId: 'pet123-uuid-format'
      }
    }
    #swagger.responses[201] = { description: 'Vacuna registrada exitosamente' }
    #swagger.responses[400] = { description: 'Error de validación' }
    #swagger.responses[401] = { description: 'No autorizado' }
    #swagger.responses[403] = { description: 'Rol insuficiente' }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.VET]),
  createVaccineHandler
);

router.get(
  '/',
  /*
    #swagger.tags = ['Vaccines']
    #swagger.description = 'Obtener todas las vacunas (aplicaciones) <br><b>Roles permitidos:</b> ADMIN, VET, RECEPTIONIST'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'Lista de vacunas obtenida exitosamente',
      schema: [{
        id: 'vaccine123',
        name: 'Rabia',
        appliedDate: '2024-07-01T10:00:00.000Z',
        nextDose: '2025-07-01T10:00:00.000Z',
        petId: 'pet123',
        createdAt: '2024-07-01T10:00:00.000Z'
      }]
    }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.VET, Role.RECEPTIONIST]),
  getVaccinesHandler
);

router.get(
  '/:id',
  /*
    #swagger.tags = ['Vaccines']
    #swagger.description = 'Obtener una vacuna por ID <br><b>Roles permitidos:</b> ADMIN, VET, RECEPTIONIST'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { in: 'path', description: 'ID de la vacuna', required: true, type: 'string' }
    #swagger.responses[200] = {
      description: 'Vacuna encontrada',
      schema: {
        id: 'vaccine123',
        name: 'Rabia',
        appliedDate: '2024-07-01T10:00:00.000Z',
        nextDose: '2025-07-01T10:00:00.000Z',
        petId: 'pet123',
        createdAt: '2024-07-01T10:00:00.000Z'
      }
    }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.VET, Role.RECEPTIONIST]),
  getVaccineByIdHandler
);

router.put(
  '/:id',
  /*
    #swagger.tags = ['Vaccines']
    #swagger.description = 'Actualizar una vacuna (campos opcionales) <br><b>Roles permitidos:</b> ADMIN, VET'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { in: 'path', description: 'ID de la vacuna', required: true, type: 'string' }
    #swagger.parameters['body'] = {
      in: 'body', description: 'Datos a actualizar', required: true, schema: { name: 'Rabia', appliedDate: '2024-07-02T10:00:00.000Z', nextDose: '2025-07-02T10:00:00.000Z' }
    }
    #swagger.responses[200] = { description: 'Vacuna actualizada exitosamente' }
    #swagger.responses[400] = { description: 'Error de validación' }
    #swagger.responses[404] = { description: 'Vacuna no encontrada' }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.VET]),
  updateVaccineHandler
);

router.delete(
  '/:id',
  /*
    #swagger.tags = ['Vaccines']
    #swagger.description = 'Eliminar una vacuna <br><b>Roles permitidos:</b> ADMIN'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { in: 'path', description: 'ID de la vacuna', required: true, type: 'string' }
    #swagger.responses[200] = { description: 'Vacuna eliminada exitosamente' }
    #swagger.responses[404] = { description: 'Vacuna no encontrada' }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  deleteVaccineHandler
);

export default router;