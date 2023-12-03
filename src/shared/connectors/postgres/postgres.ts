import { Sequelize, Options as SequelizeOptions } from 'sequelize';
import { BaseLogger } from '../../interfaces';
import appLogger from '../../logger';
import { ErrorMessages } from './error-messages';

export class PostgresConnection {
  private static orm_instance: Sequelize | undefined;
  private static instance: PostgresConnection | undefined;
  private logger: BaseLogger = appLogger;
  private constructor() {}

  static init(config: SequelizeOptions): PostgresConnection {
    if (PostgresConnection.instance === undefined) {
      if (PostgresConnection.orm_instance === undefined) {
        PostgresConnection.orm_instance = new Sequelize(config);
      }
      PostgresConnection.instance = new PostgresConnection();
    }
    return PostgresConnection.instance;
  }

  get connectionInstance(): Sequelize | undefined {
    return PostgresConnection.orm_instance;
  }

  async checkConnection(): Promise<void> {
    try {
      this.logger.info({ message: ErrorMessages.DB_STATUS_CHECK });
      await PostgresConnection.orm_instance!.authenticate();
      this.logger.info({ message: ErrorMessages.DB_STATUS_CHECK_SUCCESS });
    } catch (error) {
      this.logger.fatal({
        message: ErrorMessages.DB_STATUS_CHECK_FAILURE,
        error
      });
      throw error;
    }
  }

  async terminate(): Promise<void> {
    try {
      this.logger.info({ message: ErrorMessages.DB_TERMINATION_ATTEMPT });
      await PostgresConnection.orm_instance!.close();
      this.logger.info({
        message: ErrorMessages.DB_TERMINATION_ATTEMPT_SUCCESS
      });
    } catch (error) {
      this.logger.fatal({
        message: ErrorMessages.DB_TERMINATION_ATTEMPT_FAILURE,
        error
      });
    }
  }
}
