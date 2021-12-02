import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { Question, QuestionAnswer, questionDiscriminator } from './quiz';

export class GamePreference {
  @IsBoolean()
  isInteractive!: boolean;
  @IsBoolean()
  shuffleQuestions!: boolean;
}

export class PlayGameRequestBody extends GamePreference {
  @IsString()
  quizId!: string;
}

export enum QuestionState {
  Correct,
  Incorrect,
  Unanswered
}

export interface GameResult {
  unanswered: number;
  correct: number;
  wrong: number;
  questionsState: Array<QuestionState>;
}

export class GameSummary extends GamePreference {
  @AutoMap()
  id!: string;
  @AutoMap()
  userId!: string;
  @AutoMap()
  quizId!: string;
  @AutoMap()
  quizTitle!: string;
  @AutoMap()
  isPlaying!: boolean;
  @AutoMap()
  result?: GameResult;
}

export class Game extends GameSummary {
  @Type(() => Question, {
    discriminator: questionDiscriminator
  })
  questions!: Array<Question>;
  correctAnswers?: Array<QuestionAnswer>;
}
