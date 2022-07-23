// require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRouter from './routers/auth.route';
import userRouter from './routers/users.route';
import movieRouter from './routers/movies.route';
import { errorReqHandler } from './controllers/error.controller';
import isAuth from './middleware/auth';
import { userActive } from './middleware/user-active';
// config dotenv
dotenv.config();
//---------------------------------
/*
 *Requre modules to the app
 */
/**
 *Configration the app and middleware
 */
const app = express();
app.use(express.static('videos'));
/**
 * Confirm Cors Origin
 * Accept All Request Methods
 * Accept All Servers Requests
 */
app.use((req, res, next) => {
  // server Allow to Connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request Methods Allowed
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  // Requests Headers Allowed
  res.setHeader('Access-Control-Allow-Headers', '*');
  // Go For Next Middleware To Handle Request
  next();
});
// parse req body to js object
app.use(bodyParser.json());
app.use(express.static('assets'));
/**
 * Import Routers use them in app
 */
//For Authentication
app.use(isAuth);
app.use(userActive);
//create account (log in | sign up)
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/m', movieRouter);
//create Users For Account Or Get this users

/**
 * Handel Errors
 */
app.use(errorReqHandler);

/**
 * Start the server
 */
const startServer = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/netflix');
    app.listen(8080);
  } catch (err) {
    console.log(err);
  }
};
startServer();
