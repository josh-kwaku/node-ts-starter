import { SupportedAuthTypes } from '../../connectors/auth/types';
import { Result } from '../../error';

export interface AuthUserEntityTypes {}

export interface AuthUserEntity {
  create<Input>(data: Input): Promise<Result>;

  getAll<Input>(data: Input): Promise<Result>;

  // Types(): AllTypes
}
