import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();


const corsOrigin = process.env.CORS_ORIGIN;
console.log('CORS_ORIGIN env:', corsOrigin);

let corsOptions: cors.CorsOptions | undefined;

if (corsOrigin === '*') {
  // Si es '*', permitir todos los orígenes
  corsOptions = { origin: '*' };
} else if (corsOrigin) {
  // Si hay una lista separada por comas, procesarla
  const origins = corsOrigin.split(',').map((o) => o.trim()).filter(Boolean);
  if (origins.length > 0) {
    corsOptions = { origin: origins };
  }
}

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', router);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});