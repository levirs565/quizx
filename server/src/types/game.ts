import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { Question, QuestionAnswer, questionDiscriminator } from './quiz';

export abstract class GamePreference {
  @IsBoolean()
  shuffleQuestions!: boolean;
}

export class FlashCardGamePreference extends GamePreference {
  @IsNumber()
  @Min(0)
  questionTimeMinute?: number;
  @IsNumber()
  @Min(0)
  retryCount?: number;
}

export class ExamGamePreference extends GamePreference {
  @IsNumber()
  @Min(0)
  examTimeMinute?: number;
}

export enum GameType {
  Exam = 'exam',
  FlashCard = 'flash-card'
}

export class PlayGameRequestBody {
  @IsString()
  quizId!: string;
  @Type(() => GamePreference, {
    discriminator: {
      property: 'type',
      subTypes: [
        {
          name: GameType.FlashCard,
          value: FlashCardGamePreference,
        },
        {
          name: GameType.Exam,
          value: ExamGamePreference,
        },
      ],
    },
  })
  preference!: GamePreference;
}

export enum QuestionState {
  Correct,
  Incorrect,
  Unanswered,
}

export interface GameResult {
  unanswered: number;
  correct: number;
  wrong: number;
}

export class GameSummary {
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
  @AutoMap()
  startTime!: Date;
  @AutoMap()
  finishTime!: Date;
}

export abstract class GameData {
  preference!: GamePreference;
}

export class FlashCardGameData extends GameData {
  preference!: FlashCardGamePreference;
  currentQuestionIndex!: number;
  currentQuestionMaxTime!: number;
}

export class ExamGameData extends GameData {
  preference!: ExamGamePreference;
  maxFinishTime!: Date;
}

export class Game extends GameSummary {
  @Type(() => Question, {
    discriminator: questionDiscriminator,
  })
  questions!: Array<Question>;
  questionsState!: Array<QuestionState>;
  correctAnswers?: Array<QuestionAnswer>;
  @Type(() => GameData, {
    discriminator: {
      property: 'type',
      subTypes: [
        {
          name: GameType.Exam,
          value: ExamGameData
        },
        {
          name: GameType.FlashCard,
          value: FlashCardGameData
        }
      ]
    }
  })
  data!: GameData;
}

