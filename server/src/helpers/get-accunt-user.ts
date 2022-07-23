import { NextFunction, Request } from 'express';
import accountModel from '../models/account.model';
import User from '../types/user';
import { ErrorRequest } from './error-handel';

const getAccountAndUser = async (req: Request, next: NextFunction) => {
  const accountId = req.id;
  if (!accountId) throw new ErrorRequest('Authentication failed!', 403, 'failed');

  const userId = req.activeUserId;
  if (!userId || userId === '') throw new ErrorRequest('Authentication failed!', 403, 'failed');

  const account = await accountModel.findById(accountId).populate('users.userId');
  if (!account) throw new ErrorRequest('something Wrong.', 500, 'failed');

  const activeUser = account.users.find((user) => user.userId._id.toString() === userId)?.userId as User;

  if (!activeUser) throw new ErrorRequest('something wrong!', 401, 'failed');

  return { user: activeUser, account: account };
};

export default getAccountAndUser;
