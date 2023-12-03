import { BaseConfig } from '../../base.config';

type Config = {
  DB_NAME: string;
  DB_HOST: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_SCHEMA?: string;
};

export class PostgresConfig extends BaseConfig<Config> {
  constructor() {
    super();
  }
}
