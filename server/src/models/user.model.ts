import * as Mongoose from 'mongoose';
import User from '../types/user';

const Schema = Mongoose.Schema;

const userSchema = new Schema<User>({
  name: {
    type: String,
    maxlength: 100,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  accountId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'account',
  },
  likeList: [],
  loveList: [],
  dislikeList: [],
});

export default Mongoose.model<User>('user', userSchema);
