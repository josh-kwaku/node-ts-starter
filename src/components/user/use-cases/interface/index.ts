import { Result } from '../../../../shared/error';

export interface UseCase<ReturnType> {
  execute(...args: any): Promise<Result<ReturnType>>;
}
