import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import ownerRoutes from './routes/owners.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './config/swagger-output.json' assert { type: 'json' };
import petRoutes from './routes/pet.routes.js';
import treatmentRoutes from './routes/treatment.routes.js';

import appointmentRoutes from './routes/appointment.routes.js';
import vetRoutes from './routes/vet.routes.js';
import vaccineRoutes from './routes/vaccine.routes.js';
import statsRoutes from './routes/stats.routes.js';

dotenv.config();
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 
app.get('/api/ok', (req, res) =>{
    res.status(200).json({ message: 'veterinaria en funcionamiento' });
})

app.use('/api/auth', authRoutes)
app.use('/api/owners', ownerRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use('/api/vets', vetRoutes);
app.use('/api/vaccines', vaccineRoutes);
app.use('/api/stats', statsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación API en http://localhost:${PORT}/api/docs`);
});

console.info('Aplicación iniciada correctamente.');