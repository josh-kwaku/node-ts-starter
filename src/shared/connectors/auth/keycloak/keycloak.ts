import KcAdminClient from '@keycloak/keycloak-admin-client';
import { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth';
import appLogger from '../../../logger';

export class KeycloakConnector {
  private static lib_instance: KcAdminClient;
  private static instance: KeycloakConnector | undefined;

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

  get connectorInstance() {
    return KeycloakConnector.lib_instance;
  }

  async authenticate(credentials: Credentials) {
    try {
      appLogger.info({ message: 'Connecting to keycloak...' });
      await KeycloakConnector.lib_instance!.auth(credentials);
      appLogger.info({ message: 'Connection to keycloak successful' });
    } catch (error) {
      appLogger.fatal({ message: 'Keycloak connection error', error });
      throw new Error('keycloak connection error', { cause: error });
    }
  }
}
