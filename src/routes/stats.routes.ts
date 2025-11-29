import { Router } from 'express';
import { Role } from '@prisma/client';
import { authMiddleware as authenticateToken, authorizeRole } from '../middleware/auth.middleware';
import { getDashboardStatsHandler } from '../controllers/stats.controller';

const router = Router();

router.get(
  '/dashboard',
  /*
    #swagger.tags = ['Stats']
    #swagger.description = 'Obtener estadísticas del dashboard <br><b>Roles permitidos:</b> ADMIN, VET'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'Estadísticas del dashboard',
      schema: {
        appointmentsToday: [{
          id: 'appointment123',
          date: '2024-11-25T10:00:00.000Z',
          status: 'SCHEDULED',
          pet: {
            name: 'Firulais',
            owner: {
              name: 'Juan Pérez'
            }
          },
          vet: {
            name: 'Dr. García'
          }
        }],
        appointmentsTodayCount: 5,
        newPetsCount: 12,
        expiringVaccines: [{
          id: 'vaccine123',
          name: 'Rabia',
          nextDose: '2025-12-01T00:00:00.000Z',
          pet: {
            name: 'Firulais'
          }
        }]
      }
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Rol insuficiente'
    }
  */
  authenticateToken,
  authorizeRole([Role.ADMIN, Role.VET]),
  getDashboardStatsHandler
);

export default router;