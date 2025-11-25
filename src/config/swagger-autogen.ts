import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'VetCare API',
    description: 'API para sistema de gestión veterinaria',
    version: '1.0.0',
  },
  host: 'localhost:4000',
  schemes: ['http'],
  tags: [
    { name: 'Auth', description: 'Endpoints de autenticación' },
    { name: 'Stats', description: 'Endpoints del dashboard y estadísticas' },
  ],
};

const outputFile = './src/config/swagger-output.json';
const routes = ['./src/app.ts'];

swaggerAutogen()(outputFile, routes, doc);