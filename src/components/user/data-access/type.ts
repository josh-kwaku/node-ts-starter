import { RequiredActionAlias } from '@keycloak/keycloak-admin-client/lib/defs/requiredActionProviderRepresentation';

export type AllUsers = {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  emailVerified: boolean;
  requiredActions: RequiredActionAlias[];
  access: Record<string, boolean>;
  clientRoles: Record<string, any>;
  email: string;
  firstName: string;
  lastName: string;
  realmRoles: string[];
  serviceAccountClientId: string;
};
