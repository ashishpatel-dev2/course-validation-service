import express from 'express';
import validationRoutes from './routes/validation.js';
import { AppError } from './utils/error.js';
import { sendResponse } from './utils/response.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use('/api', validationRoutes);

app.use((_req, _res, next) => next(new AppError('Route not found', 404)));

app.use((error, req, res, next) => {
  console.error('Unhandled application error:', error.message);

  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return sendResponse(res, {
      statusCode: 400,
      message: 'Invalid JSON payload'
    });
  }

  return sendResponse(res, {
    statusCode: error.statusCode || 500,
    message: error.message || 'Internal server error'
  });
});

export default app;
