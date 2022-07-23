import { RequestHandler } from 'express';
import AccountModel from '../models/account.model';
import Account from '../types/account';
import * as jwt from 'jsonwebtoken';
import { HydratedDocument, Query } from 'mongoose';
import { join } from 'path';
import { validEmail, validPassword, validPlan } from '../helpers/valid';
import { errorHandler, ErrorRequest } from '../helpers/error-handel';
import * as bcrypt from 'bcrypt';
import readFileKeys from '../helpers/readfile';

export const createNewAccountHandler: RequestHandler = async (req, res, next) => {
  try {
    if (req.id) throw new ErrorRequest('something wrong', 403, 'failed');
    const { email, password, plan } = req.body;
    if (!email || !password || !plan) throw new ErrorRequest('Please send correct data', 400, 'failed');

    if (!validEmail(email)) throw new ErrorRequest('Email not valid', 400, 'failed');

    const curAccount = (await AccountModel.findOne({ email: email })) as Account;

    if (curAccount) throw new ErrorRequest('email already exists', 409, 'failed');

    if (!validPassword(password)) throw new ErrorRequest('Password not valid', 400, 'failed');
    if (!validPlan(plan)) throw new ErrorRequest('Plan not valid', 400, 'failed');

    const hashPassword = await bcrypt.hash(password, 12);

    if (!hashPassword) throw new ErrorRequest('Something wrong, try again later!', 500, 'failed');

    // console.log(hashPassword);
    const newAccount: HydratedDocument<Account> = new AccountModel({ email, password: hashPassword, plan });

    if (!newAccount) throw new ErrorRequest('Something wrong, try again later!', 500, 'failed');

    const resultAccount = await newAccount.save();

    if (!resultAccount) throw new ErrorRequest('Something wrong, try again later!', 500, 'failed');

    const PRIVATE_KEY = readFileKeys(join(__dirname, '..', 'jwt.key'), () => {
      throw new ErrorRequest('Something wrong happend, try again later!', 500, 'failed');
    });

    if (!PRIVATE_KEY) throw new ErrorRequest('Something wrong, try again later!', 500, 'failed');

    const token = jwt.sign({ id: resultAccount._id }, PRIVATE_KEY);
    return res.status(202).json({ code: 202, status: 'success', data: { token: token, ...resultAccount._doc } });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};

export const getLoginHandler: RequestHandler = async (req, res, next) => {
  try {
    if (req.id) throw new ErrorRequest('something wrong', 403, 'failed');
    const email: string = req.body.email;
    const password: string = req.body.password;
    if (!email || !password) throw new ErrorRequest('enter valid data!', 400, 'failed');

    const account = <Account>await AccountModel.findOne({ email: email });

    if (!account) throw new ErrorRequest('email not found', 404, 'not-found');

    const passwordCheck = await bcrypt.compare(password, account.password);

    if (!passwordCheck) throw new ErrorRequest('Password not correct', 403, 'failed');

    const PRIVATE_KEY = readFileKeys(join(__dirname, '..', 'jwt.key'), () => {
      throw new ErrorRequest('Something wrong happend, try again later!', 500, 'failed');
    });

    if (!PRIVATE_KEY) throw new ErrorRequest('Something wrong, try again later!', 500, 'failed');

    const token = jwt.sign({ id: account._id }, PRIVATE_KEY);
    return res.status(202).json({ code: 202, status: 'success', data: { token: token, ...account._doc } });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};
