import { RequestHandler } from 'express';
import { errorHandler, ErrorRequest } from '../helpers/error-handel';
import readFileKeys from '../helpers/readfile';
import { join } from 'path';
import * as jwt from 'jsonwebtoken';

interface AuthAccount {
  id: string;
}

const isAuth: RequestHandler = async (req, res, next) => {
  try {
    const token = req.query.token as string;
    if (!token) {
      req.id = '';
      return next();
    }
    const TOKEN_KEY = readFileKeys(join(__dirname, '..', 'jwt.key'), () => {
      throw new ErrorRequest('some thing happend', 500, 'failed');
    });

    const jwtVerifed = <AuthAccount>jwt.verify(token, <string>TOKEN_KEY);
    if (!jwtVerifed.id) {
      throw new ErrorRequest('something wrong', 500, 'failed');
    }
    req.id = jwtVerifed.id;
    next();
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};

export default isAuth;
