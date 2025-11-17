import { Router } from 'express';
import { registerHandler, loginHandler, getProfileHandler } from '../controllers/auth.controllers.js';

import { authMiddleware } from '../middleware/auth.middleware.js';
import { get } from 'http';

const router = Router();

//lo comentarios de las rutas, ayudan a la documentacion del endpoint con swagger

router.post('/register', 
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
        role: 'ADMIN, VET, CLIENTE'
      }
    }
  */
  registerHandler
);

router.post('/login', 
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
  */
  loginHandler
);

router.get('/profile' /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Obtener el perfil del usuario autenticado'
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
  */, authMiddleware, 
  
  getProfileHandler
);

export default router;