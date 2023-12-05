import { describe, jest, it, expect, afterAll, beforeAll } from '@jest/globals';
import KcAdminClient from '@keycloak/keycloak-admin-client';

import { KeycloakContainer, StartedKeycloakContainer } from './keycloak';

describe('Keycloak container', () => {
  jest.setTimeout(180_000);
  let container: StartedKeycloakContainer;
  let client: KcAdminClient;
  beforeAll(async () => {
    container = await new KeycloakContainer().start();
    client = new KcAdminClient({
      baseUrl: container.getConnectionUri(),
      realmName: 'master'
    });
  });

  it('should connect successfully', async () => {
    console.log('uri: ', container.getUsername(), container.getPassword());
    await client.auth({
      username: container.getUsername(),
      password: container.getPassword(),
      clientId: 'admin-cli',
      grantType: 'password'
    });
    expect(await client.getAccessToken()).toBeDefined();
  });
});
