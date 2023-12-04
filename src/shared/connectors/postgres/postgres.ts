import { Sequelize, Options as SequelizeOptions } from 'sequelize';
import { BaseLogger } from '../../interfaces';
import appLogger from '../../logger';
import { ErrorMessages } from './error-messages';

export class PostgresConnection {
  private static orm_instance: Sequelize | undefined;
  private static instance: PostgresConnection | undefined;
  private static logger: BaseLogger = appLogger;
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

  static connectionInstance(): Sequelize | undefined {
    return PostgresConnection.orm_instance;
  }

  async checkConnection(): Promise<void> {
    try {
      PostgresConnection.logger.info({
        message: ErrorMessages.DB_STATUS_CHECK
      });
      await PostgresConnection.orm_instance!.authenticate();
      PostgresConnection.logger.info({
        message: ErrorMessages.DB_STATUS_CHECK_SUCCESS
      });
    } catch (error) {
      PostgresConnection.logger.fatal({
        message: ErrorMessages.DB_STATUS_CHECK_FAILURE,
        error
      });
      throw error;
    }
  }

  static async terminate(): Promise<void> {
    try {
      PostgresConnection.logger.info({
        message: ErrorMessages.DB_TERMINATION_ATTEMPT
      });
      await PostgresConnection.orm_instance!.close();
      PostgresConnection.logger.info({
        message: ErrorMessages.DB_TERMINATION_ATTEMPT_SUCCESS
      });
    } catch (error) {
      PostgresConnection.logger.fatal({
        message: ErrorMessages.DB_TERMINATION_ATTEMPT_FAILURE,
        error
      });
    }
  }
}
