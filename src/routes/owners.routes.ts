import { Router } from 'express';
import { 
  createOwnerHandler, 
  getAllOwnersHandler, 
  getOwnerByIdHandler, 
  updateOwnerHandler, 
  deleteOwnerHandler 
} from '../controllers/owner.controller.js';
import { authMiddleware, authorizeRole } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

router.post('/',
  /* 
    #swagger.tags = ['Owners']
    #swagger.description = 'Crear un nuevo propietario <br><b>Roles permitidos:</b> ADMIN, RECEPTIONIST'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos del propietario',
      required: true,
      schema: {
        name: 'Juan Pérez',
        phone: '1234567890',
        email: 'juan@example.com'
      }
    }
    #swagger.responses[201] = {
      description: 'Propietario creado exitosamente'
    }
    #swagger.responses[400] = {
      description: 'Error de validación'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente'
    }
  */
  authMiddleware,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST]),
  createOwnerHandler
);

router.get('/',
  /* 
    #swagger.tags = ['Owners']
    #swagger.description = 'Obtener todos los propietarios <br><b>Roles permitidos:</b> Todos los usuarios autenticados'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'Lista de propietarios obtenida exitosamente',
      schema: [{
        id: 'owner123',
        name: 'Juan Pérez',
        phone: '1234567890',
        email: 'juan@example.com',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }]
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
  */
  authMiddleware,
  getAllOwnersHandler
);

router.get('/:id',
  /* 
    #swagger.tags = ['Owners']
    #swagger.description = 'Obtener un propietario por ID <br><b>Roles permitidos:</b> Todos los usuarios autenticados'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del propietario',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Propietario encontrado',
      schema: {
        id: 'owner123',
        name: 'Juan Pérez',
        phone: '1234567890',
        email: 'juan@example.com',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }
    }
    #swagger.responses[404] = {
      description: 'Propietario no encontrado'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
  */
  authMiddleware,
  getOwnerByIdHandler
);

router.put('/:id',
  /* 
    #swagger.tags = ['Owners']
    #swagger.description = 'Actualizar un propietario <br><b>Roles permitidos:</b> ADMIN, RECEPTIONIST'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del propietario',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos a actualizar (todos opcionales)',
      required: true,
      schema: {
        name: 'Juan Pérez',
        phone: '1234567890',
        email: 'juan@example.com'
      }
    }
    #swagger.responses[200] = {
      description: 'Propietario actualizado exitosamente'
    }
    #swagger.responses[400] = {
      description: 'Error de validación'
    }
    #swagger.responses[404] = {
      description: 'Propietario no encontrado'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente'
    }
  */
  authMiddleware,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST]),
  updateOwnerHandler
);

router.delete('/:id',
  /* 
    #swagger.tags = ['Owners']
    #swagger.description = 'Eliminar un propietario <br><b>Roles permitidos:</b> ADMIN'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del propietario',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Propietario eliminado exitosamente'
    }
    #swagger.responses[404] = {
      description: 'Propietario no encontrado'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente - Solo ADMIN'
    }
  */
  authMiddleware,
  authorizeRole([Role.ADMIN]),
  deleteOwnerHandler
);

export default router;