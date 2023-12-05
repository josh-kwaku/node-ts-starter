import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler
} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pinoHttp from 'pino-http';
import appLogger from './shared/logger';
import { AppLogger } from './shared/logger/logger';
import { ErrorHandler } from './shared/error';
import { PostgresConfig } from './shared/connectors/postgres/config';
import { PostgresConnection } from './shared/connectors/postgres/postgres';
import { KeycloakConfig } from './shared/connectors/auth/keycloak/config';
import { KeycloakConnector } from './shared/connectors/auth/keycloak/keycloak';
import { AppController } from './components';

export class App {
  public static instance = express();
  private postgresConfig: PostgresConfig;
  private postgresConnection: typeof PostgresConnection;
  private authClientConfig: KeycloakConfig;
  private authClient: typeof KeycloakConnector;
  private appController: typeof AppController;

  constructor(
    postgresConfig: PostgresConfig,
    postgresConnection: typeof PostgresConnection,
    authClientConfig: KeycloakConfig,
    authClient: typeof KeycloakConnector,
    appController: typeof AppController
  ) {
    this.postgresConfig = postgresConfig;
    this.postgresConnection = postgresConnection;
    this.authClientConfig = authClientConfig;
    this.authClient = authClient;
    this.appController = appController;
  }

  async init() {
    await this.initDb();
    await this.initAuthClient();
    this.appController.init();

    App.instance.use(cors());
    App.instance.use(
      pinoHttp({
        logger: AppLogger.lib_instance
      })
    );
    App.instance.use(bodyParser.urlencoded({ extended: true }));

    App.instance.use((req: Request, res: Response, next: NextFunction) => {
      bodyParser.json()(req, res, (err) => {
        if (err) {
          appLogger.error({ error: err });
          // perform extra error handling here
        }
        next();
      });
    });

    App.instance.use(this.appController.router);

    App.instance.use(
      async (
        err: Error,
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        await ErrorHandler.handleError(err);
      }
    );
  }

  private async initDb() {
    const configValues = this.postgresConfig.configValues;
    await this.postgresConnection
      .init({
        username: configValues?.DB_USERNAME,
        password: String(configValues?.DB_PASSWORD ?? ''),
        port: configValues?.DB_PORT,
        database: configValues?.DB_NAME,
        schema: configValues?.DB_SCHEMA,
        dialect: 'postgres'
      })
      .checkConnection();
  }

  private async initAuthClient() {
    const configValues = this.authClientConfig.configValues;
    console.log('configValues: ', configValues);
    await this.authClient
      .init({
        url: configValues?.AUTH_CLIENT_BASE_URL!,
        realm: configValues?.AUTH_CLIENT_REALM!
      })
      .authenticate({
        username: configValues?.AUTH_CLIENT_USERNAME,
        password: configValues?.AUTH_CLIENT_PASSWORD,
        grantType: configValues?.AUTH_CLIENT_GRANT_TYPE ?? 'client_credentials',
        clientId: configValues?.AUTH_CLIENT_ID ?? ''
      });
  }
}
