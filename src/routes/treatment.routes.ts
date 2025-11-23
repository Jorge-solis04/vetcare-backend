import { Router } from "express";
import { authMiddleware, authorizeRole } from "../middleware/auth.middleware.js";
import { Role } from "@prisma/client";

import { 
  createTreatmentHandler, 
  updateTreatmentHandler, 
  deleteTreatmentHandler, 
  getTreatmentsByPetHandler 
} from "../controllers/treatment.controller.js";

const router = Router();
router.use(authMiddleware);

router.get('/pet/:petId',
  /* 
    #swagger.tags = ['Treatments']
    #swagger.description = 'Obtener todos los tratamientos de una mascota'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['petId'] = {
      in: 'path',
      description: 'ID de la mascota',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Tratamientos obtenidos exitosamente',
      schema: [{
        id: 'treatment123',
        description: 'Tratamiento antibiótico por infección',
        start: '2024-01-01T00:00:00.000Z',
        end: '2024-01-15T00:00:00.000Z',
        petId: 'pet123',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z'
      }]
    }
    #swagger.responses[400] = {
      description: 'ID de mascota no proporcionado'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente'
    }
  */
  authorizeRole([Role.ADMIN, Role.VET, Role.RECEPTIONIST]),
  getTreatmentsByPetHandler
);

router.post('/',
  /* 
    #swagger.tags = ['Treatments']
    #swagger.description = 'Crear un nuevo tratamiento'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos del tratamiento',
      required: true,
      schema: {
        description: 'Tratamiento antibiótico por infección',
        start: '2024-01-01',
        end: '2024-01-15',
        petId: 'pet123-uuid-format'
      }
    }
    #swagger.responses[201] = {
      description: 'Tratamiento creado exitosamente'
    }
    #swagger.responses[400] = {
      description: 'Error de validación - La fecha de finalización no puede ser anterior a la fecha de inicio'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente - Solo ADMIN y VET'
    }
  */
  authorizeRole([Role.ADMIN, Role.VET]), 
  createTreatmentHandler
);

router.put('/:id',
  /* 
    #swagger.tags = ['Treatments']
    #swagger.description = 'Actualizar un tratamiento'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del tratamiento',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos a actualizar'
    }
    #swagger.responses[200] = {
      description: 'Tratamiento actualizado exitosamente'
    }
    #swagger.responses[400] = {
      description: 'ID de tratamiento no proporcionado'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente'
    }
  */
  authorizeRole([Role.ADMIN, Role.VET]), 
  updateTreatmentHandler
);

router.delete('/:id',
    /*  #swagger.tags = ['Treatments']
    #swagger.description = 'Eliminar un tratamiento'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del tratamiento',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Tratamiento eliminado exitosamente'
    }
    #swagger.responses[400] = {
      description: 'ID de tratamiento no proporcionado'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente'
    }
  */
    
    authorizeRole([Role.ADMIN, Role.VET]), deleteTreatmentHandler);

export default router;