import { Schema, Model, model } from 'mongoose';

// TODO: Rename id to _id

export interface User {
  id: string
  name: string
  password: string
  isAdmin: boolean
  registerDate: Date
}

const userScheme = new Schema<User>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      minlength: 4
    },
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 25
    },
    password: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false
    },
    registerDate: {
      type: Date,
      required: true,
      default: Date.now
    }
  },
  {
    collection: 'user'
  }
);

const UserModel: Model<User> = model<User>('User', userScheme);

export default UserModel;
