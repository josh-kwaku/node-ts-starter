import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { BaseMapper } from '../../shared/interfaces';
import { User } from '../domain';
import { UserProps } from '../domain/user';

export class UserMapper
  implements BaseMapper<UserRepresentation, User, UserProps>
{
  toDBEntity(domain_entity: UserProps): UserRepresentation {
    return {
      firstName: domain_entity.first_name,
      lastName: domain_entity.last_name,
      username: domain_entity.username,
      email: domain_entity.email?.value
    };
  }

  toDomain(db_entity: UserRepresentation): User {
    return User.create(db_entity.id!, {
      first_name: db_entity.firstName ?? '',
      last_name: db_entity.lastName ?? '',
      email: {
        value: db_entity.email!,
        verified: db_entity.emailVerified!
      },
      username: db_entity.username ?? '',
      active: db_entity.enabled!
    });
  }
}
