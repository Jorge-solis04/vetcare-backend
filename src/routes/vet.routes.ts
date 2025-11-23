import { Router } from 'express';
import { Role } from '@prisma/client';
import { authMiddleware as authenticateToken, authorizeRole } from '../middleware/auth.middleware';

import {
  createVetHandler,
  getAllVetsHandler,
  getVetByIdHandler,
  updateVetHandler,
  deleteVetHandler,
} from '../controllers/vet.controller';

const router = Router();

router.post('/',
  /* 
    #swagger.tags = ['Vets']
    #swagger.description = 'Crear un nuevo veterinario'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos del veterinario',
      required: true,
      schema: {
        name: 'Dr. Carlos García',
        specialty: 'Cirugía',
        isActive: true
      }
    }
    #swagger.responses[201] = {
      description: 'Veterinario creado exitosamente'
    }
    #swagger.responses[400] = {
      description: 'Error de validación'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente - Solo ADMIN'
    }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  createVetHandler
);

router.get('/',
  /* 
    #swagger.tags = ['Vets']
    #swagger.description = 'Obtener todos los veterinarios'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'Lista de veterinarios obtenida exitosamente',
      schema: [{
        id: 'vet123',
        name: 'Dr. Carlos García',
        specialty: 'Cirugía',
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }]
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST, Role.VET]),
  getAllVetsHandler
);

router.get('/:id',
  /* 
    #swagger.tags = ['Vets']
    #swagger.description = 'Obtener un veterinario por ID'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del veterinario',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Veterinario encontrado',
      schema: {
        id: 'vet123',
        name: 'Dr. Carlos García',
        specialty: 'Cirugía',
        isActive: true,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }
    }
    #swagger.responses[404] = {
      description: 'Veterinario no encontrado'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST, Role.VET]),
  getVetByIdHandler
);

router.put('/:id',
  /* 
    #swagger.tags = ['Vets']
    #swagger.description = 'Actualizar un veterinario'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del veterinario',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos a actualizar (todos opcionales)',
      required: true,
      schema: {
        name: 'Dr. Carlos García',
        specialty: 'Cirugía Veterinaria',
        isActive: true
      }
    }
    #swagger.responses[200] = {
      description: 'Veterinario actualizado exitosamente'
    }
    #swagger.responses[400] = {
      description: 'Error de validación'
    }
    #swagger.responses[404] = {
      description: 'Veterinario no encontrado'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente - Solo ADMIN'
    }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  updateVetHandler
);

router.delete('/:id',
  /* 
    #swagger.tags = ['Vets']
    #swagger.description = 'Eliminar un veterinario'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del veterinario',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Veterinario eliminado exitosamente'
    }
    #swagger.responses[404] = {
      description: 'Veterinario no encontrado'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente - Solo ADMIN'
    }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  deleteVetHandler
);

export default router;