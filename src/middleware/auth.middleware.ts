import type {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({message: 'No se envio el token de autenticacion'});
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({message: 'Token de autenticacion no proporcionado'});
    }

    try {
        const verifiedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = verifiedToken;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Token de autenticacion invalido'});
    }
}
