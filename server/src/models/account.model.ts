import * as Mongoose from 'mongoose';
import Account from '../types/account';
import User from '../types/user';

const Schema = Mongoose.Schema;

const accountSchema = new Schema<Account>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  plan: String,
  users: {
    type: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'user' },
        name: String,
        imageUrl: String,
        _id: false,
      },
    ],
    required: true,
  },
});

export default Mongoose.model<Account>('accounts', accountSchema);
