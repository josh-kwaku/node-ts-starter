import path from 'path';
import dotenv, { DotenvConfigOptions } from 'dotenv';

const default_path = path.join(process.cwd(), '.env');
export abstract class BaseConfig<ConfigType> {
  private options: DotenvConfigOptions;
  private is_env_vars_loaded: boolean = false;
  protected ConfigValues: ConfigType | undefined;

  constructor(options: DotenvConfigOptions = { path: default_path }) {
    this.options = options;
    this.init();
  }

  private init() {
    if (this.is_env_vars_loaded) {
      return;
    }
    const result = dotenv.config(this.options);
    if (result.error !== undefined) {
      throw new Error('Could not load environment variables', {
        cause: result.error
      });
    }
    this.is_env_vars_loaded = true;
    this.ConfigValues = result.parsed as ConfigType;
  }

  abstract get configValues(): ConfigType | undefined;
}
