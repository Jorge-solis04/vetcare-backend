import prisma from '../prisma/client';

export const getDashboardStats = async () => {

  const now = new Date();
  
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const nextWeek = new Date(now);
  nextWeek.setDate(now.getDate() + 7);

  const [appointmentsToday, newPetsCount, expiringVaccines] = await Promise.all([
    
    prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        pet: {
          select: {
            id: true,
            name: true,
            species: true,
            breed: true,
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              }
            }
          },
        },
        vet: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    }),

    prisma.pet.count({
      where: {
        createdAt: {
          gte: new Date(now.getFullYear(), now.getMonth(), 1),
        },
      },
    }),

    prisma.vaccine.findMany({
      where: {
        nextDose: {
          gte: now,
          lte: nextWeek,
        },
      },
      include: {
        pet: true,
      },
      orderBy: {
        nextDose: 'asc',
      },
    }),
  ]);

  return {
    appointmentsToday,
    appointmentsTodayCount: appointmentsToday.length,
    newPetsCount,
    expiringVaccines,
  };
};