import { Router } from 'express';
import { Role } from '@prisma/client';
import { authMiddleware as authenticateToken, authorizeRole } from '../middleware/auth.middleware';
import { getDashboardStatsHandler } from '../controllers/stats.controller';

const router = Router();

router.get(
  '/dashboard',
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.VET]),
  getDashboardStatsHandler
);

export default router;