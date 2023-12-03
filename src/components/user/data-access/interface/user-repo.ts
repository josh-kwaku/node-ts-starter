import { Result } from '../../../../shared/error';
import { User } from '../../domain';

export interface UserRepo {
  getUsers(): Promise<Result<User[]>>;
}
