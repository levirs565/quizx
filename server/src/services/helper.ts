import Session from '../types/session';
import { EError, E } from '../error';

export async function validateUserLoggedIn(session: Session) {
  if (!session.user) throw new EError(...E.E304_USER_NOT_LOGGED_IN);
  return session.user;
}

export async function validateUserIsAdmin(session: Session) {
  const user = await validateUserLoggedIn(session);
  if (!user.isAdmin) throw new EError(...E.E306_USER_IS_NOT_ADMIN);
  return user;
}

export async function validateUserId(session: Session, id: string) {
  const user = await validateUserLoggedIn(session)
  if (user.id != id) throw new EError(...E.E307_ACCESS_DENIED)
  return user;
}
