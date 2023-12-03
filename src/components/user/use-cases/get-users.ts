import { UserRepo } from '../data-access/interface';
import { User } from '../domain';
import { UseCase } from './interface';

export class GetUsers implements UseCase<User[]> {
  private userRepository: UserRepo;
  constructor(userRepository: UserRepo) {
    this.userRepository = userRepository;
  }

  async execute() {
    const result = await this.userRepository.getUsers();
    return result;
  }
}
