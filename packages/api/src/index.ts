import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { config, isDev } from './config';
import { errorHandler } from './middleware/errorHandler';
import apiRouter from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(isDev ? 'dev' : 'combined'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'w4u-api', env: config.env });
});

app.use('/api/v1', apiRouter);

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: 'Endpoint not found' },
  });
});

app.use(errorHandler);

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`[W4U API] Listening on port ${config.port} (${config.env})`);
});

export default app;
