import { genSalt, hash as _hash, compare } from 'bcrypt';
import UserModel, { User } from '../models/user';
import Session from '../types/session';
import { EError, E } from '../error';

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

export async function signup(id: string, name: string, password: string) {
  let user = await UserModel.findOne({ id });

  if (user) throw new EError(...E.E301_USER_ALREADY_REGISTERED);

  const salt = await genSalt(saltRounds);
  const hashedPassword = await _hash(password, salt);
  user = new UserModel({
    id,
    name,
    password: hashedPassword,
  });

  return await user.save();
}

export async function login(id: string, password: string, session: Session) {
  if (session.user) {
    throw new EError(...E.E303_USER_LOGGED_IN);
  }

  const user = await UserModel.findOne({ id });
  if (!user) {
    throw new EError(...E.E302_USER_NOT_REGISTERED);
  }

  const matched = compare(password, user.password);

  if (!matched) throw new EError(...E.E305_USER_PASSWORD_NOT_MATCH);

  loginAs(user, session);
}

export async function logout(session: Session) {
  await validateUserLoggedIn(session);
  loginAs(undefined, session);
}

export async function validateUserLoggedIn(session: Session) {
  if (!session.user) throw new EError(...E.E304_USER_NOT_LOGGED_IN);
  return session.user;
}

export async function validateUserIsAdmin(session: Session) {
  const user = await validateUserLoggedIn(session);
  if (!user.isAdmin) throw new EError(...E.E306_USER_IS_NOT_ADMIN);
  return user;
}

export const getLoggedInAs = (session: Session) => session.user;
