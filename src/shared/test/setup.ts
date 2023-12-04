import request from 'supertest';
import { App } from '../../app';
import { PostgresConfig } from '../connectors/postgres/config';
import { PostgresConnection } from '../connectors/postgres/postgres';
import { KeycloakConfig } from '../connectors/auth/keycloak/config';
import { KeycloakConnector } from '../connectors/auth/keycloak/keycloak';
import { AppController } from '../../components';

export class TestModule {
  private server: request.SuperTest<request.Test>;

  private constructor() {
    this.server = request(App.instance);
  }

  public getServer() {
    return this.server;
  }

  static async init() {
    await new App(
      new PostgresConfig(),
      PostgresConnection,
      new KeycloakConfig(),
      KeycloakConnector,
      AppController
    ).init();
    return new TestModule();
  }

  async teardown() {
    await PostgresConnection.terminate();
  }
}
