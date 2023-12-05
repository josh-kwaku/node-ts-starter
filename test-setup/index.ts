import request from 'supertest';
import { App } from '../src/app';
import { PostgresConfig } from '../src/shared/connectors/postgres/config';
import { PostgresConnection } from '../src/shared/connectors/postgres/postgres';
import { KeycloakConfig } from '../src/shared/connectors/auth/keycloak/config';
import { KeycloakConnector } from '../src/shared/connectors/auth/keycloak/keycloak';
import { AppController } from '../src/components';
import {
  KeycloakContainer,
  StartedKeycloakContainer
} from './containers/keycloak';

export class TestModule {
  private server: request.SuperTest<request.Test>;
  private static authContainer: StartedKeycloakContainer;
  private constructor() {
    this.server = request(App.instance);
  }

  public getServer() {
    return this.server;
  }

  private static async startContainers() {
    TestModule.authContainer = await new KeycloakContainer().start();
  }

  private async killContainers() {
    await TestModule.authContainer.stop();
  }

  private static overrideAuthConfig() {
    const authConfig = new KeycloakConfig();
    authConfig.overrideConfig({
      AUTH_CLIENT_BASE_URL: TestModule.authContainer.getConnectionUri(),
      AUTH_CLIENT_PASSWORD: TestModule.authContainer.getPassword(),
      AUTH_CLIENT_REALM: 'master',
      AUTH_CLIENT_USERNAME: TestModule.authContainer.getUsername(),
      AUTH_CLIENT_ID: 'admin-cli',
      AUTH_CLIENT_GRANT_TYPE: 'password'
    });
    return authConfig;
  }

  static async init() {
    await TestModule.startContainers();
    await new App(
      new PostgresConfig(),
      PostgresConnection,
      TestModule.overrideAuthConfig(),
      KeycloakConnector,
      AppController
    ).init();
    return new TestModule();
  }

  async teardown() {
    await PostgresConnection.terminate();
    await this.killContainers();
  }
}
