import { Result } from '../../../../shared/error';
import { ResultErr } from '../../../../shared/error/result';
import { UserRepo } from '../../data-access/interface';
import { User } from '../../domain';
import { allUsers } from './get-users-mock';

export class UserRepositoryMock implements UserRepo {
  async getUsers(): Promise<Result<User[], ResultErr>> {
    return Promise.resolve(new Result<User[]>({ output: allUsers }));
  }
}
