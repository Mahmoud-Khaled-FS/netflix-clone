import { RequestHandler } from 'express';
import { HydratedDocument } from 'mongoose';
import getListType from '../helpers/createListType';
import { errorHandler, ErrorRequest } from '../helpers/error-handel';
import getAccountAndUser from '../helpers/get-accunt-user';
import accountModel from '../models/account.model';
import userModel from '../models/user.model';
// import Account from '../types/account';
import { readFileSync } from 'fs';
import User from '../types/user';
import { UserLists } from '../types/userLists';
import { join } from 'path';

export const createUsers: RequestHandler = async (req, res, next) => {
  try {
    //check account can abrove new user or not
    const accountId = req.id;
    if (!accountId) throw new ErrorRequest('Authentication failed!', 403, 'failed');
    const account = await accountModel.findById(accountId);
    if (!account) throw new ErrorRequest('something Wrong.', 500, 'failed');

    const usersNames = req.body['users-names'];
    if (!usersNames || !(usersNames instanceof Array))
      throw new ErrorRequest('no users founded in request', 401, 'failed');

    if (account.users.length >= 5 || account.users.length + usersNames.length > 5)
      throw new ErrorRequest('Max length is 5', 401, 'failed');
    // ('./../data/netflix-icons.json');
    //Create new users for account
    const rawdata = readFileSync(join(__dirname, '..', 'data', 'netflix-icons.json')).toString();
    const icons = JSON.parse(rawdata);

    for (const name of usersNames) {
      const index = generateRandomIntegerInRange(0, icons.length - 1);
      const newUser: HydratedDocument<User> = new userModel({
        name: name,
        imageUrl: `http://localhost:8080/icons/${icons[index].id}.png`,
        accountId: account._id,
      });

      const savedUser = await newUser.save();

      account.users.push({ name: savedUser.name, imageUrl: savedUser.imageUrl, userId: savedUser._id });

      await account.save();
    }
    res.status(202).json({ code: 202, status: 'success', data: account.users });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const accountId = req.id;
    if (!accountId) throw new ErrorRequest('Authentication failed!', 403, 'failed');

    const account = await accountModel.findById(accountId);
    if (!account) throw new ErrorRequest('something Wrong.', 500, 'failed');

    res.status(202).json({ code: 202, status: 'success', data: account.users });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};

export const addToList: RequestHandler = async (req, res, next) => {
  try {
    const rUser = await getAccountAndUser(req, next);

    const listType = getListType(req.params.listName) as UserLists;

    if (!req.body.itemId) throw new ErrorRequest('no item in request', 403, 'failed');

    const itemExisting = rUser.user[listType].find((i) => i === req.body.itemId);

    if (itemExisting) {
      return res
        .status(202)
        .json({ code: 202, status: 'succes', message: 'item was existed before', data: rUser.user[listType] });
    }

    rUser.user.dislikeList = rUser.user.dislikeList.filter((i) => i !== req.body.itemId);
    rUser.user.likeList = rUser.user.likeList.filter((i) => i !== req.body.itemId);
    rUser.user.loveList = rUser.user.loveList.filter((i) => i !== req.body.itemId);

    rUser.user[listType].push(req.body.itemId);
    const resultUser = await rUser.user.save();
    return res.status(202).json({ code: 202, status: 'succes', data: resultUser[listType] });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};

export const getList: RequestHandler = async (req, res, next) => {
  try {
    const rUser = await getAccountAndUser(req, next);

    const listType = getListType(req.params.listName) as UserLists;

    const list = rUser.user[listType];

    const page = req.body.page ? req.body.page : 1;

    const indexStart = (1 - 1) * 40;
    const indexEnd = indexStart + 39;

    const newList = list.slice(indexStart, indexEnd);

    return res.status(202).json({ code: 202, status: 'succes', data: { page: page, list: newList } });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};

export const deleteList: RequestHandler = async (req, res, next) => {
  try {
    const rUser = await getAccountAndUser(req, next);

    const listType = getListType(req.params.listName) as UserLists;

    const list = rUser.user[listType];

    const itemId = req.body.itemId as string;

    const newList = list.filter((id) => id !== itemId);

    rUser.user[listType] = newList;

    const newUser = await rUser.user.save();

    return res.status(202).json({ code: 202, status: 'succes', data: rUser.user[listType] });
  } catch (err: any) {
    next(errorHandler(err.message, err.code, err.status));
  }
};

function generateRandomIntegerInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
