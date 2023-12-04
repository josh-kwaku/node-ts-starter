import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import appLogger from './shared/logger';
import { AppConfig } from './config';
import { ErrorHandler } from './shared/error';
import { PostgresConnection } from './shared/connectors/postgres/postgres';
import { App } from './app';
import { PostgresConfig } from './shared/connectors/postgres/config';
import { KeycloakConfig } from './shared/connectors/auth/keycloak/config';
import { KeycloakConnector } from './shared/connectors/auth/keycloak/keycloak';
import { AppController } from './components';

(async function initApp() {
  await new App(
    new PostgresConfig(),
    PostgresConnection,
    new KeycloakConfig(),
    KeycloakConnector,
    AppController
  ).init();
})();

const server = http.createServer(App.instance);
const appConfig = new AppConfig().configValues!;

const closeOpenConnections = () => {
  appLogger.info({ message: 'Shutting down server and open connections' });
  server.close(async () => {
    appLogger.info({ message: 'Server shut down' });
    await PostgresConnection.terminate();
    process.exit(1);
  });
};

process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (error: Error) => {
  appLogger.fatal({ error, message: 'Fatal error encountered' });
  ErrorHandler.handleError(error);
  if (!ErrorHandler.isTrustedError(error)) {
    closeOpenConnections();
  }
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
