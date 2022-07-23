import { NextFunction } from 'express';

export class ErrorRequest extends Error {
  code: number;
  status: string;

  constructor(message: string, code: number, status: string) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export const errorHandler = (message?: string, code?: number, status?: string): ErrorRequest => {
  const messageError = message ? message : 'Something wrong';
  const codeError = code ? code : 500;
  const statusError = status ? status : 'failed';
  const error = new ErrorRequest(messageError, codeError, statusError);
  return error;
};
