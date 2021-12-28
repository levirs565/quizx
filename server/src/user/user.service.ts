import { genSalt, hash as _hash, compare } from 'bcrypt';
import { User, UserModelName } from '../schemas/user.schema';
import Session from '../types/session';
import { validateUserLoggedIn } from '../common/service.helper';
import { UserState } from '../types/user';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseModel } from 'schemas/helper';
import { CommonServiceException } from 'common/common-service.exception';

const saltRounds = 10;

const loginAs = (user: User | undefined, session: Session) => {
  const ses = session;
  ses.user = user
    ? {
        name: user.name,
        id: user.id,
        isAdmin: user.isAdmin,
      }
    : undefined;
};

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModelName) private readonly userModel: BaseModel<User>) {}

  async signup(id: string, name: string, password: string) {
    let user = await this.userModel.findOne({ id });

    if (user) throw new CommonServiceException('User already registered');

    const salt = await genSalt(saltRounds);
    const hashedPassword = await _hash(password, salt);
    user = new this.userModel({
      id,
      name,
      password: hashedPassword,
    });

    await user.save();
  }

  async login(id: string, password: string, session: Session) {
    if (session.user) {
      throw new CommonServiceException('User already logged in');
    }

    const user = await this.userModel.findOne({ id });
    if (!user) {
      throw new CommonServiceException('User not registered');
    }

    const matched = await compare(password, user.password);

    if (!matched) throw new CommonServiceException('Password not match');

    loginAs(user, session);
  }

  async logout(session: Session) {
    validateUserLoggedIn(session);
    loginAs(undefined, session);
  }

  getState(session: Session): UserState {
    return {
      user: session.user,
    };
  }
}
