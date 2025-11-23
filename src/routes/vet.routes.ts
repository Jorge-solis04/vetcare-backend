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

router.post(
  '/',
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  createVetHandler
);

router.get(
  '/',
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST, Role.VET]),
  getAllVetsHandler
);

router.get(
  '/:id',
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST, Role.VET]),
  getVetByIdHandler
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  updateVetHandler
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  deleteVetHandler
);

export default router;