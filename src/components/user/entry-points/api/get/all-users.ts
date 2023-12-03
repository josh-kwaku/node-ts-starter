import { Request, Response, NextFunction } from 'express';
import { UserRouter } from '../router';
import { UseCase } from '../../../use-cases/interface';
import { Controller } from '../../../../shared/interfaces';
import { AppError } from '../../../../../shared/error';
import { User } from '../../../domain';
import { ErrorCodes } from '../../../utils/error-codes';
import { ResultErr } from '../../../../../shared/error/result';
import { CommonErrors } from '../../../../../shared/error/common';
import { HttpStatusCode } from '../../../../../shared/http-status-codes';
import { SuccessResponse } from '../../../../../shared/utils/success-response';

export class GetUsersController implements Controller {
  private getUsers: UseCase<User[]>;
  constructor(getUsers: UseCase<User[]>) {
    this.getUsers = getUsers;
  }

  init() {
    UserRouter.get(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        const result = await this.getUsers.execute();
        const resp = result.unwrap_or_else(
          this.errorHandler(result.Error(), res, next)
        );
        return res.json(new SuccessResponse<User[]>('', resp!));
      }
    );
  }

  errorHandler(
    error: ResultErr | undefined,
    res: Response,
    next: NextFunction
  ) {
    return function () {
      if (!error) return;
      let appError: AppError = new AppError(
        CommonErrors.INTERNAL_SERVER_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        { message: '', code: ErrorCodes.GET_ALL_USERS_FAILED }
      );
      switch (error.code) {
        case ErrorCodes.GET_ALL_USERS_FAILED:
          appError.isOperational = true;
        default:
          res.status(appError.httpCode).json(appError.response);
          next(appError);
      }
    };
  }
}
