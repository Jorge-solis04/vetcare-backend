import type { Request, Response } from 'express';
import * as statsService from '../services/stats.service';

export const getDashboardStatsHandler = async (req: Request, res: Response) => {
  try {
    const stats = await statsService.getDashboardStats();
    
    res.status(200).json(stats);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener estadísticas del dashboard' });
  }
};