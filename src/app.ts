import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './config/swagger-output.json' assert { type: 'json' };

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/ok', (req, res) =>{
    res.status(200).json({ message: 'veterinaria en funcionamiento' });
})

app.use('/api/auth', authRoutes)

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación API en http://localhost:${PORT}/api/docs`);
});

console.info('Aplicación iniciada correctamente.');