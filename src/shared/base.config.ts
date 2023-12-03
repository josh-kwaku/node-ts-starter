import path from 'path';
import dotenv, { DotenvConfigOptions } from 'dotenv';

const default_path = path.join(process.cwd(), '.env');
export abstract class BaseConfig<ConfigType> {
  private options: DotenvConfigOptions;
  private static is_env_vars_loaded: boolean = false;
  protected static values: any;

  constructor(options: DotenvConfigOptions = { path: default_path }) {
    this.options = options;
    this.init();
  }

  private init() {
    if (BaseConfig.is_env_vars_loaded) {
      return;
    }
    const result = dotenv.config(this.options);
    if (result.error !== undefined) {
      throw new Error('Could not load environment variables');
    }
    BaseConfig.is_env_vars_loaded = true;
    BaseConfig.values = result.parsed as ConfigType;
  }

  get configValues(): ConfigType | undefined {
    return BaseConfig.values;
  }
}
