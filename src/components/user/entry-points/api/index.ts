import { KeycloakConnector } from '../../../../shared/connectors/auth/keycloak/keycloak';
import appLogger from '../../../../shared/logger';
import { UserRepository } from '../../data-access';
import { UserMapper } from '../../mappers/user-mapper';
import { GetUsers } from '../../use-cases/get-users';
import { GetUsersController } from './get/all-users';
import { UserRouter } from './router';

export class UserApi {
  public static router = UserRouter;

  constructor() {}

  static init() {
    const userRepo = new UserRepository(
      KeycloakConnector.connectorInstance()!,
      appLogger,
      new UserMapper()
    );
    new GetUsersController(new GetUsers(userRepo)).init();
  }
}
