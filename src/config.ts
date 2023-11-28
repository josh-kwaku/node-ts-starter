import { BaseConfig } from './shared/interfaces';

type Config = {
  PORT: number;
};
export class AppConfig extends BaseConfig<Config> {
  constructor() {
    super();
  }

  get configValues(): Config | undefined {
    return this.ConfigValues;
  }
}
