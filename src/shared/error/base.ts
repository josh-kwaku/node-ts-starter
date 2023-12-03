import { HttpStatusCode } from '../http-status-codes';
import { CommonErrors } from './common';

export type ErrorResponse = {
  message: string;
  code: string;
};

export class AppError extends Error {
  public readonly name: CommonErrors;
  public readonly httpCode: HttpStatusCode;
  public isOperational: boolean;
  public readonly response: ErrorResponse;

  constructor(
    name: CommonErrors,
    httpCode: HttpStatusCode,
    response: ErrorResponse,
    isOperational: boolean = false
  ) {
    super(response.message);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.response = response;

    Error.captureStackTrace(this);
  }
}
