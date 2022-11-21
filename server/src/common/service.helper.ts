import Session from '../types/session.js';
import { MathQuestion, Question, QuestionAnswer } from '@quizx/shared';
import ComputeEngine from '@cortex-js/compute-engine';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

export function validateUserLoggedIn(session: Session) {
  if (!session.user) throw new UnauthorizedException();
  return session.user;
}

export function validateUserId(session: Session, id: string) {
  const user = validateUserLoggedIn(session);
  if (user.id != id) throw new ForbiddenException('Access denied');
  return user;
}

export function validateQuestionAnswerDataType(
  actual: QuestionAnswer,
  answer: QuestionAnswer | undefined
) {
  if (answer == undefined) return;
  if (typeof answer !== typeof actual) {
    throw new Error('Question answer data type is not match');
  }
}

export function checkQuestionAnswer(
  question: Question,
  correctAnswer: QuestionAnswer,
  userAnswer: QuestionAnswer | undefined
): boolean {
  if (question instanceof MathQuestion) {
    const ce = new ComputeEngine.ComputeEngine();
    const correctMath = ce.parse(correctAnswer as string).canonical;
    const userMath = ce.parse(userAnswer as string).canonical;
    if (!correctMath || !userMath) {
      throw Error('Correct math or');
    }
    return userMath.match(correctMath) !== null;
  }
  return correctAnswer === userAnswer;
}

export function addSecondToDate(date: Date, minute: number) {
  return new Date(date.getTime() + minute * 1000);
}
