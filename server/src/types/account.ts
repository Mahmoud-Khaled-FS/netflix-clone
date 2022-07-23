import * as Mongoose from 'mongoose';
import User from './user';
export default interface Account extends Mongoose.Document {
  email: string;
  password: string;
  plan: string;
  _doc: Account;
  _id: Mongoose.ObjectId;
  users: [
    {
      userId: Mongoose.Types.ObjectId | User;
      name: string;
      imageUrl: string;
    },
  ];
}
