import { Router } from 'express';
import { Role } from '@prisma/client';
import { authMiddleware as authenticateToken, authorizeRole } from '../middleware/auth.middleware';
import { getDashboardStatsHandler } from '../controllers/stats.controller';

const router = Router();

/*
  #swagger.tags = ['Stats']
  #swagger.description = 'Obtener estadísticas del dashboard'
  #swagger.security = [{ "bearerAuth": [] }]
  #swagger.responses[200] = {
    description: 'Estadísticas del dashboard',
    schema: {
      appointmentsToday: 5,
      newPetsCount: 12,
      expiringVaccines: [
        {
          id: 'vaccine123',
          name: 'Vacuna A',
          nextDose: '2025-12-01T00:00:00.000Z'
        }
      ]
    }
  }
*/
router.get(
  '/dashboard',
  /*
    #swagger.tags = ['Stats']
    #swagger.description = 'Obtener estadísticas del dashboard'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'Estadísticas del dashboard',
      schema: {
        appointmentsToday: 5,
        newPetsCount: 12,
        expiringVaccines: [
          {
            id: 'vaccine123',
            name: 'Vacuna A',
            nextDose: '2025-12-01T00:00:00.000Z'
          }
        ]
      }
    }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.VET]),
  getDashboardStatsHandler
);

export default router;