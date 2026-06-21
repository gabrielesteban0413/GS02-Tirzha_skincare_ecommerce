import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

const corsOrigins = process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean);

app.use(
  cors(
    corsOrigins && corsOrigins.length > 0
      ? {
          origin: corsOrigins,
        }
      : undefined,
  ),
);
app.use(express.json());
app.use('/api', router);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});