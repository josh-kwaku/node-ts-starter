import KcAdminClient from '@keycloak/keycloak-admin-client';
import { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth';
import appLogger from '../../../logger';

export class KeycloakConnector {
  private static lib_instance: KcAdminClient;
  private static instance: KeycloakConnector | undefined;
  private static logger = appLogger;
  private constructor() {}

  static init(config: { url: string; realm: string }) {
    if (KeycloakConnector.instance === undefined) {
      if (KeycloakConnector.lib_instance === undefined) {
        KeycloakConnector.lib_instance = new KcAdminClient({
          baseUrl: config.url,
          realmName: config.realm
        });
      }
      KeycloakConnector.instance = new KeycloakConnector();
    }
    return KeycloakConnector.instance;
  }

  static connectorInstance() {
    return KeycloakConnector.lib_instance;
  }

  async authenticate(credentials: Credentials) {
    try {
      KeycloakConnector.logger.info({ message: 'Connecting to keycloak...' });
      await KeycloakConnector.lib_instance!.auth(credentials);
      KeycloakConnector.logger.info({
        message: 'Connection to keycloak successful'
      });
    } catch (error) {
      KeycloakConnector.logger.fatal({
        message: 'Keycloak connection error',
        error
      });
      throw new Error('keycloak connection error');
    }
  }
}
