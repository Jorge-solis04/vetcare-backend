import { Router } from 'express';
import { registerHandler, loginHandler } from '../controllers/auth.controllers.js';

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

export default router;