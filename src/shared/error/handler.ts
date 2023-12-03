import { HttpStatusCode } from '../http-status-codes';
import appLogger from '../logger';
import { AppError } from './base';

export class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    if (err instanceof AppError) {
      this.logError(err);
      if (err.isOperational === false) throw err;
    } else {
      appLogger.fatal({ error: err });
      throw err;
    }
  }

  private logError(error: AppError) {
    if (
      error.httpCode >= HttpStatusCode.BAD_REQUEST &&
      error.httpCode < HttpStatusCode.INTERNAL_SERVER_ERROR
    ) {
      appLogger.info(error);
    } else {
      appLogger.error(error);
    }
  }

  public isTrustedError(error: Error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}
