import { Router } from 'express';
import { Role } from '@prisma/client';
import { authMiddleware as authenticateToken, authorizeRole } from '../middleware/auth.middleware';

import {
  createOwnerHandler,
  getAllOwnersHandler,
  getOwnerByIdHandler,
  updateOwnerHandler,
  deleteOwnerHandler,
} from '../controllers/owner.controller';

const router = Router();

router.post(
  '/',
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST]),
  createOwnerHandler
);

router.get(
  '/',
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST, Role.VET]),
  getAllOwnersHandler
);

router.get(
  '/:id',
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST, Role.VET]),
  getOwnerByIdHandler
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.RECEPTIONIST]),
  updateOwnerHandler
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRole([Role.ADMIN]),
  deleteOwnerHandler
);

export default router;