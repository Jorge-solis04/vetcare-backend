import { Router } from 'express';
import { 
  createOwnerHandler, 
  getAllOwnersHandler, 
  getOwnerByIdHandler, 
  updateOwnerHandler, 
  deleteOwnerHandler 
} from '../controllers/owner.controller';
import { authMiddleware, authorizeRole } from '../middleware/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

router.post('/',
  /* 
    #swagger.tags = ['Owners']
    #swagger.description = 'Crear un nuevo propietario'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  authMiddleware,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST]),
  createOwnerHandler
);

router.get('/',
  /* 
    #swagger.tags = ['Owners']
    #swagger.description = 'Obtener todos los propietarios'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  authMiddleware,
  getAllOwnersHandler
);

router.get('/:id',
  /* 
    #swagger.tags = ['Owners']
    #swagger.description = 'Obtener un propietario por ID'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  authMiddleware,
  getOwnerByIdHandler
);

router.put('/:id',
  /* 
    #swagger.tags = ['Owners']
    #swagger.description = 'Actualizar un propietario'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  authMiddleware,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST]),
  updateOwnerHandler
);

router.delete('/:id',
  /* 
    #swagger.tags = ['Owners']
    #swagger.description = 'Eliminar un propietario'
    #swagger.security = [{ "bearerAuth": [] }]
  */
  authMiddleware,
  authorizeRole([Role.ADMIN]),
  deleteOwnerHandler
);

export default router;