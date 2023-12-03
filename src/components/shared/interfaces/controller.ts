import { NextFunction, Response } from 'express';
import { ResultErr } from '../../../shared/error/result';

export interface Controller {
  init(): void;
  errorHandler(
    error: ResultErr | undefined,
    res: Response,
    next: NextFunction
  ): void;
}
