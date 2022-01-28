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
  questionTimeMinute?: Number;
  @IsNumber()
  @Min(0)
  retryCount?: Number;
}

export class ExamGamePreference extends GamePreference {
  @IsNumber()
  @Min(0)
  examTimeMinute?: Number;
}

enum GameType {
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
  finishTime!: Date;
  @AutoMap()
  endTime!: Date;
}

export abstract class GameData {
  peference!: GamePreference;
}

export class FlashCardGameData extends GameData {
  preference!: FlashCardGamePreference;
  currentQuestionIndex!: number;
  currentQuestionMaxTime!: number;
}

export class ExamGameData extends GameData {
  peference!: ExamGamePreference;
  maxFinishTime!: Date;
}

export abstract class Game extends GameSummary {
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

