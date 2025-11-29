import { Router } from "express";
import { authMiddleware, authorizeRole } from "../middleware/auth.middleware.js";
import { Role } from "@prisma/client";

import {
    createPetHandler,
    deletePetHandler,
    getPetByIdHandler,
    getPetsHanldler,
    updatePetHandler
} from "../controllers/pet.controller.js";

const router = Router();

router.use(authMiddleware);

router.get('/',
  /* 
    #swagger.tags = ['Pets']
    #swagger.description = 'Obtener todas las mascotas <br><b>Roles permitidos:</b> Todos los usuarios autenticados'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'Lista de mascotas obtenida exitosamente',
      schema: [{
        id: 'pet123',
        name: 'Firulais',
        species: 'Perro',
        breed: 'Labrador',
        birthDate: '2020-01-01T00:00:00.000Z',
        ownerId: 'owner123',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }]
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
  */
  getPetsHanldler
);

router.get('/:id',
  /* 
    #swagger.tags = ['Pets']
    #swagger.description = 'Obtener una mascota por ID <br><b>Roles permitidos:</b> Todos los usuarios autenticados'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID de la mascota',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Mascota encontrada',
      schema: {
        id: 'pet123',
        name: 'Firulais',
        species: 'Perro',
        breed: 'Labrador',
        birthDate: '2020-01-01T00:00:00.000Z',
        ownerId: 'owner123',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }
    }
    #swagger.responses[400] = {
      description: 'ID de mascota no proporcionado'
    }
    #swagger.responses[404] = {
      description: 'Mascota no encontrada'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
  */
  getPetByIdHandler
);

router.post('/',
  /* 
    #swagger.tags = ['Pets']
    #swagger.description = 'Crear una nueva mascota <br><b>Roles permitidos:</b> ADMIN, RECEPTIONIST'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos de la mascota',
      required: true,
      schema: {
        name: 'Firulais',
        species: 'Perro',
        breed: 'Labrador',
        birthDate: '2020-01-01',
        ownerId: 'owner123-uuid-format'
      }
    }
    #swagger.responses[201] = {
      description: 'Mascota creada exitosamente'
    }
    #swagger.responses[400] = {
      description: 'Error de validación o ownerId no existe'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente'
    }
  */
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST]), 
  createPetHandler
);

router.put('/:id',
  /* 
    #swagger.tags = ['Pets']
    #swagger.description = 'Actualizar una mascota <br><b>Roles permitidos:</b> ADMIN, VET, RECEPTIONIST'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID de la mascota',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos a actualizar (todos opcionales)',
      required: true,
      schema: {
        name: 'Firulais',
        species: 'Perro',
        breed: 'Labrador',
        birthDate: '2020-01-01',
        ownerId: 'owner123-uuid-format'
      }
    }
    #swagger.responses[200] = {
      description: 'Mascota actualizada exitosamente'
    }
    #swagger.responses[400] = {
      description: 'Error de validación o ID no proporcionado'
    }
    #swagger.responses[404] = {
      description: 'Mascota no encontrada'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente'
    }
  */
  authorizeRole([Role.ADMIN, Role.VET, Role.RECEPTIONIST]),
  updatePetHandler
);

router.delete('/:id',
  /* 
    #swagger.tags = ['Pets']
    #swagger.description = 'Eliminar una mascota <br><b>Roles permitidos:</b> ADMIN'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID de la mascota',
      required: true,
      type: 'string'
    }
    #swagger.responses[204] = {
      description: 'Mascota eliminada exitosamente'
    }
    #swagger.responses[400] = {
      description: 'ID de mascota no proporcionado o tiene registros relacionados'
    }
    #swagger.responses[404] = {
      description: 'Mascota no encontrada'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente - Solo ADMIN'
    }
  */
  authorizeRole([Role.ADMIN]),
  deletePetHandler
);

export default router;