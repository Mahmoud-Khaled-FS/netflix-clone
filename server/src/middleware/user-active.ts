import { RequestHandler } from 'express';

export const userActive: RequestHandler = (req, res, next) => {
  const userId = req.query.userid;
  // console.log(userId);
  if (userId) {
    req.activeUserId = <string>userId;
  } else {
    req.activeUserId = '';
  }
  return next();
};
