import { ErrorRequestHandler } from 'express';
import { ErrorRequest } from '../helpers/error-handel';

export const errorReqHandler: ErrorRequestHandler = (err: ErrorRequest, req, res, next) => {
  return res.status(err.code).json({ code: err.code, status: err.status, message: err.message });
};
