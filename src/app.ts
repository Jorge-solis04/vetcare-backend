import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/ok', (req, res) =>{
    res.status(200).json({ message: 'veterinaria en funcionamiento' });
} )

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});