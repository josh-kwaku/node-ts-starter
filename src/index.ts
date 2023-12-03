import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import app from './app';
import appLogger from './shared/logger';
import { AppConfig } from './config';
import postgresHandler from './shared/connectors/postgres/index';

const server = http.createServer(app);

const appConfig = new AppConfig().configValues!;

const closeOpenConnections = () => {
  appLogger.info({ message: 'Shutting down server and open connections' });
  server.close(async () => {
    appLogger.info({ message: 'Server shut down' });
    await postgresHandler.terminate();
    process.exit(1);
  });
};

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
  closeOpenConnections();
});

process.on('SIGINT', () => {
  appLogger.info({ message: 'SIGINT Signal Received' });
  closeOpenConnections();
});

server.listen(appConfig.PORT, () => {
  appLogger.info({ message: `Server listening on port ${appConfig.PORT}` });
});
