import KcAdminClient from '@keycloak/keycloak-admin-client';
import { UserRepo } from './interface';
import { BaseLogger } from '../../../shared/interfaces';
import { BaseMapper } from '../../shared/interfaces';
import { User } from '../domain';
import { UserProps } from '../domain/user';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { ErrorMessages } from './error-messages';
import { Result } from '../../../shared/error';
import { ErrorCodes } from '../utils/error-codes';

export class UserRepository implements UserRepo {
  private dataAccessClient: KcAdminClient;
  private logger: BaseLogger;
  private mapper: BaseMapper<UserRepresentation, User, UserProps>;

  constructor(
    client: KcAdminClient,
    logger: BaseLogger,
    mapper: BaseMapper<UserRepresentation, User, UserProps>
  ) {
    this.dataAccessClient = client;
    this.logger = logger;
    this.mapper = mapper;
  }

  async getUsers() {
    try {
      this.logger.info({ message: 'trying to fetch all users' });
      const result = await this.dataAccessClient.users.find();
      const users = result.map((user) => {
        return this.mapper.toDomain(user);
      });
      this.logger.info({ message: 'allusers successfully fetched' });
      return new Result<User[]>({ output: users });
    } catch (error) {
      this.logger.error({ message: ErrorMessages.GET_USERS_FAILED, error });
      return new Result({
        error: { original_error: error, code: ErrorCodes.GET_ALL_USERS_FAILED }
      });
    }
  }
}
