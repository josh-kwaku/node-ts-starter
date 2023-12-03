import { GrantTypes } from '@keycloak/keycloak-admin-client/lib/utils/auth';
import { KeycloakConfig } from './config';
import { KeycloakConnector } from './keycloak';

const configValues = new KeycloakConfig().configValues;
const connector = KeycloakConnector.init({
  url: configValues?.AUTH_CLIENT_BASE_URL!,
  realm: configValues?.AUTH_CLIENT_REALM!
});

(async function initKeycloak() {
  connector.authenticate({
    username: configValues?.AUTH_CLIENT_USERNAME,
    password: configValues?.AUTH_CLIENT_PASSWORD,
    grantType: configValues?.AUTH_CLIENT_GRANT_TYPE ?? 'client_credentials',
    clientId: configValues?.AUTH_CLIENT_ID ?? ''
  });
})();

export const authClient = connector.connectorInstance;
