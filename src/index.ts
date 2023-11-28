import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app';
import appLogger from './shared/logger';
import { AppConfig } from './config';

const server = http.createServer(app);

const appConfig = new AppConfig().configValues!;

const closeOpenConnections = (errorOccurred: boolean) => {
  appLogger.info({ message: 'Shutting down server and open connections' });
  server.close(() => {
    appLogger.info({ message: 'Server shut down' });
    // close database connections here and process.exit(1)
  });
};

server.listen(appConfig.PORT, () => {
  appLogger.info({ message: `Server listening on port ${appConfig.PORT}` });
});

process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  appLogger.fatal({ error, message: 'Fatal error encountered' });
  // handler.handleError(error);
  // if (!handler.isTrustedError(error)) {
  //     closeOpenConnections(true);
  // }
});

process.on('SIGTERM', () => {
  appLogger.info({ message: 'SIGTERM Signal Received' });
  closeOpenConnections(false);
});

process.on('SIGINT', () => {
  appLogger.info({ message: 'SIGINT Signal Received' });
  closeOpenConnections(false);
});
