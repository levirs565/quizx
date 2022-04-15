import { genSalt, hash as _hash, compare } from 'bcrypt';
import Session from '../types/session';
import { validateUserLoggedIn } from '../common/service.helper';
import { User, UserState } from '../types/user';
import { Injectable } from '@nestjs/common';
import { CommonServiceException } from 'common/common-service.exception';
import { UserRepository } from './user.repository';

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
  constructor(private readonly repository: UserRepository) {}
  async signup(id: string, name: string, password: string) {
    if (await this.repository.isRegistered(id))
      throw new CommonServiceException('User already registered');

    const salt = await genSalt(saltRounds);
    const hashedPassword = await _hash(password, salt);
    const user = new User();
    user.id = id;
    user.name = name;
    user.password = hashedPassword;

    await this.repository.createOne(user);
  }

  async login(id: string, password: string, session: Session) {
    if (session.user) {
      throw new CommonServiceException('User already logged in');
    }

    const user = await this.repository.getById(id);
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
