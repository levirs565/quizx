import { Schema, model } from 'mongoose';
import { BaseModelSchema, BaseModel, configureBaseModelSchema } from './helper';

// TODO: Rename id to _id

export class User {
  id!: string;
  name!: string;
  password!: string;
  isAdmin!: boolean;
  registerDate!: Date;
}

export const UserSchema: BaseModelSchema<User> = new Schema(
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

export const UserModelName = 'User';

configureBaseModelSchema(UserSchema, User);