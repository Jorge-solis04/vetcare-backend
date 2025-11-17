import { Role } from '@prisma/client';

export interface JwtPayload {
    id: string;
    email: string;
    role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {}