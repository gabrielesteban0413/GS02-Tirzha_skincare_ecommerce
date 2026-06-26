import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();


const corsOrigin = process.env.CORS_ORIGIN;
console.log('CORS_ORIGIN env:', corsOrigin);

const normalizeOrigin = (origin: string) => {
  const trimmed = origin.trim().replace(/\/+$/, '');
  if (trimmed === '*') return '*';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed === 'localhost' || trimmed.startsWith('localhost:')) {
    return `http://${trimmed}`;
  }
  return `https://${trimmed}`;
};

let corsOptions: cors.CorsOptions;

if (corsOrigin === '*') {
  corsOptions = { origin: '*' };
} else if (corsOrigin) {
  const origins = corsOrigin
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
    .map(normalizeOrigin);
  corsOptions = { origin: origins.length > 0 ? origins : '*' };
} else {
  corsOptions = { origin: '*' };
  console.warn(
    'CORS_ORIGIN is not defined. Backend will allow all origins by default. Set CORS_ORIGIN in production to the frontend domain for better security.'
  );
}

console.log('CORS origins allowed:', corsOptions.origin);
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use('/api', router);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});