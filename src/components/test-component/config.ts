import { BaseConfig } from '../../shared/base.config';
import { Config } from './types/config';

export class TestConfig extends BaseConfig<Config> {
  constructor() {
    super();
  }

  get configValues(): Config | undefined {
    return this.ConfigValues;
  }
}
