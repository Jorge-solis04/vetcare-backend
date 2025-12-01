import { Router } from "express";
import {
  registerHandler,
  loginHandler,
  getProfileHandler,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { Role } from "@prisma/client";
import { authorizeRole } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  /* 
    #swagger.tags = ['Auth']
    #swagger.description = 'Registrar un nuevo usuario'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos del usuario',
      required: true,
      schema: {
        email: 'usuario@example.com',
        password: 'password123',
        name: 'Juan Pérez',
        role: 'ADMIN'
      }
    }
    #swagger.responses[201] = {
      description: 'Usuario registrado exitosamente'
    }
  */
  authMiddleware,
  authorizeRole([Role.ADMIN]),
  registerHandler
);

router.post(
  "/login",
  /* 
    #swagger.tags = ['Auth']
    #swagger.description = 'Iniciar sesión'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Credenciales de usuario',
      required: true,
      schema: {
        email: 'usuario@example.com',
        password: 'password123'
      }
    }
    #swagger.responses[200] = {
      description: 'Login exitoso'
    }
  */
  loginHandler
);

router.get(
  "/profile",
  /* 
    #swagger.tags = ['Auth']
    #swagger.description = 'Obtener el perfil del usuario autenticado <br><b>Roles permitidos:</b> Todos los usuarios autenticados'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.responses[200] = {
      description: 'Perfil obtenido exitosamente',
      schema: {
        user: {
          id: 'usuario123',
          email: 'usuario@example.com',
          name: 'Juan Pérez',
          role: 'VET'
        }
      }
    }
    #swagger.responses[401] = {
      description: 'No autorizado - Token inválido o no proporcionado'
    }
  */
  authMiddleware,
  getProfileHandler
);

router.get(
  "/admin-only",
  /* 
    #swagger.tags = ['Auth']
    #swagger.description = 'Endpoint de prueba para administradores <br><b>Roles permitidos:</b> ADMIN'
    #swagger.security = [{
      "bearerAuth": []
    }]
    #swagger.responses[200] = {
      description: 'Acceso concedido'
    }
    #swagger.responses[401] = {
      description: 'No autorizado'
    }
    #swagger.responses[403] = {
      description: 'Acceso denegado - Rol insuficiente'
    }
  */
  authMiddleware,
  authorizeRole([Role.ADMIN]),
  (req, res) => {
    return res.status(200).json({ message: "Acceso concedido solo para administradores" });
  }
);

export default router;
