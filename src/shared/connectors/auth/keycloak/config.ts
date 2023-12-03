import { GrantTypes } from '@keycloak/keycloak-admin-client/lib/utils/auth';
import { BaseConfig } from '../../../base.config';

type Config = {
  AUTH_CLIENT_USERNAME: string;
  AUTH_CLIENT_PASSWORD: string;
  AUTH_CLIENT_GRANT_TYPE: GrantTypes;
  AUTH_CLIENT_ID: string;
  AUTH_CLIENT_BASE_URL: string;
  AUTH_CLIENT_REALM: string;
  AUTH_CLIENT_TOTP?: string;
};

export class KeycloakConfig extends BaseConfig<Config> {
  constructor() {
    super();
  }
}
