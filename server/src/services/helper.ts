import Session from '../types/session';
import { EError, E } from '../error';
import { Question } from '../types/quiz';
import { ComputeEngine, match as mathMatch } from '@cortex-js/compute-engine';

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
  const user = await validateUserLoggedIn(session);
  if (user.id != id) throw new EError(...E.E307_ACCESS_DENIED);
  return user;
}

export function validateQuestionAnswerDataType(
  actual: string | number,
  answer: string | number | null
) {
  if (answer == null) return;
  if (typeof answer !== typeof actual) {
    throw new Error('Question answer data type is not match');
  }
}

export function checkQuestionAnswer(
  question: Question,
  correctAnswer: string | number,
  userAnswer: string | number | null
): boolean {
  if (question.type === 'math') {
    const ce = new ComputeEngine();
    const correctMath = ce.format(ce.parse(correctAnswer as string));
    const userMath = ce.format(ce.parse(userAnswer as string));
    if (!correctMath || !userMath) {
      throw Error('Correct math or');
    }
    return mathMatch(userMath, correctMath) !== null;
  }
  return correctAnswer === userAnswer;
}
