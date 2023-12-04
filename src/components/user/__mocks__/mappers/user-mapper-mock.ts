import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { UserProps } from '../../domain/user';

export const domain_entity: UserProps = {
  first_name: 'Jake',
  last_name: 'Parkers',
  username: 'jayp',
  email: {
    value: 'jayp@gmail.com',
    verified: false
  }
};

export const db_entity: UserRepresentation = {
  firstName: 'Jake',
  lastName: 'Parkers',
  username: 'jayp',
  email: 'jayp@gmail.com',
  emailVerified: false
};
