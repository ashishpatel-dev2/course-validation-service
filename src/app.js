import express from 'express';

const app = express();

app.use(express.json());

app.use((req, res) => {
  return res.status(404).json({ message: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error('Unhandled application error:', error.message);

  if (res.headersSent) {
    return next(error);
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ message: 'Invalid JSON payload' });
  }

  return res.status(error.statusCode || 500).json({
    message: error.message || 'Internal server error'
  });
});

export default app;
