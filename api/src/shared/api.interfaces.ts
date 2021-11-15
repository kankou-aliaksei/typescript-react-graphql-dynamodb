import { ErrorCode } from './error-codes';

export type ApiHandler<I> = (input: I) => Promise<Response>;

export interface Error {
  code: ErrorCode;
  message: string;
}

export interface Request<T> {
  input: T;
}

export interface Response {
  error?: Error;
  success: boolean;
}

export interface ResponseWithResult<T> extends Response {
  result: T;
}

export type ErrorResponse = Response | undefined;
