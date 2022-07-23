import * as Mongoose from 'mongoose';

export default interface User extends Mongoose.Document {
  name: string;
  imageUrl: string;
  accountId: Mongoose.Types.ObjectId;
  _doc: User;
  likeList: string[];
  loveList: string[];
  dislikeList: string[];
}
