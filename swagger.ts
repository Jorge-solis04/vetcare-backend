import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'VetCare API',
    description: 'API para sistema de gestión veterinaria',
    version: '1.0.0',
  },
  host: 'localhost:4000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Ingrese el token en formato: Bearer {token}'
    }
  },
  tags: [
    { name: 'Auth', description: 'Endpoints de autenticación' },
    { name: 'Owners', description: 'Gestión de propietarios' },
    { name: 'Pets', description: 'Gestión de mascotas' },
    { name: 'Appointments', description: 'Gestión de citas' },
    { name: 'Treatments', description: 'Gestión de tratamientos' },
    { name: 'Vaccines', description: 'Gestión de vacunas' },
    { name: 'Vets', description: 'Gestión de veterinarios' },
    { name: 'Stats', description: 'Estadísticas del sistema' },
  ],
  definitions: {
    User: {
      id: 'user-uuid',
      email: 'usuario@example.com',
      name: 'Juan Pérez',
      role: 'ADMIN'
    },
    Owner: {
      id: 'owner-uuid',
      name: 'Juan Pérez',
      phone: '1234567890',
      email: 'juan@example.com'
    },
    Pet: {
      id: 'pet-uuid',
      name: 'Firulais',
      species: 'Perro',
      breed: 'Labrador',
      birthDate: '2020-01-01',
      ownerId: 'owner-uuid'
    },
    Appointment: {
      id: 'appointment-uuid',
      date: '2024-01-15T10:00:00.000Z',
      status: 'SCHEDULED',
      petId: 'pet-uuid',
      vetId: 'vet-uuid'
    },
    Treatment: {
      id: 'treatment-uuid',
      description: 'Tratamiento antibiótico',
      start: '2024-01-01',
      end: '2024-01-15',
      petId: 'pet-uuid'
    },
    Vaccine: {
      id: 'vaccine-uuid',
      name: 'Rabia',
      administeredAt: '2024-01-01T10:00:00.000Z',
      nextDose: '2025-01-01T10:00:00.000Z',
      petId: 'pet-uuid'
    }
  }
};

const outputFile = './src/config/swagger-output.json';
const routes = [
  './src/routes/auth.routes.ts',
  './src/routes/owners.routes.ts',
  './src/routes/pet.routes.ts',
  './src/routes/appointment.routes.ts',
  './src/routes/treatment.routes.ts',
  './src/routes/vaccine.routes.ts',
  './src/routes/vet.routes.ts',
  './src/routes/stats.routes.ts',
];

swaggerAutogen()(outputFile, routes, doc).then(() => {
  console.log('✅ Documentación Swagger generada exitosamente');
});