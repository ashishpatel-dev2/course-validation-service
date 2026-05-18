import 'dotenv/config';
import app from './app.js';
import db from './models/index.js';
import { ensureDatabaseExists } from './config/db.js';

const PORT = process.env.PORT || 5000;
let server;
let isShuttingDown = false;

const start = async () => {
  try {
    await ensureDatabaseExists();
    await db.sequelize.authenticate();
    await db.sequelize.sync();

    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (error) => {
      console.error('HTTP server error:', error.message);
    });
  } catch (error) {
    console.error('Unable to start server:', error.message);
    process.exit(1);
  }
};

const shutdown = async (exitCode = 0) => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  try {
    if (server) {
      await new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      });
    }
  } catch (error) {
    console.error('Error during shutdown:', error.message);
  } finally {
    process.exit(exitCode);
  }
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error?.message || error);
});
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error.message);
  shutdown(1);
});

start();
