import { AutoMap } from "@automapper/classes";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Question, QuestionAnswer, questionDiscriminator } from "./quiz";

export abstract class GamePreference {
  @IsBoolean()
  shuffleQuestions!: boolean;
}

export class FlashCardGamePreference extends GamePreference {
  @IsNumber()
  @Min(0)
  @IsOptional()
  questionTimeSecond?: number;
  @IsNumber()
  @Min(0)
  @IsOptional()
  retryCount?: number;
}

export class ExamGamePreference extends GamePreference {
  @IsNumber()
  @IsOptional()
  examTimeSecond?: number;
}

export enum GameType {
  Exam = "exam",
  FlashCard = "flash-card",
}

export class PlayGameRequestBody {
  @IsString()
  quizId!: string;
  @IsDefined()
  @ValidateNested({ always: true })
  @Type(() => GamePreference, {
    discriminator: {
      property: "type",
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
  finishTime?: Date;
}

export abstract class GameData {
  preference!: GamePreference;
}

export class FlashCardGameData extends GameData {
  preference!: FlashCardGamePreference;
  currentQuestionIndex!: number;
  currentQuestionMaxTime?: Date;
  currentQuestionRetryCount?: number;
}

export class ExamGameData extends GameData {
  preference!: ExamGamePreference;
  maxFinishTime?: Date;
}

export class Game extends GameSummary {
  @Type(() => Question, {
    discriminator: questionDiscriminator,
  })
  questions!: Array<Question>;
  questionsState?: Array<QuestionState>;
  correctAnswers?: Array<QuestionAnswer>;
  @Type(() => GameData, {
    discriminator: {
      property: "type",
      subTypes: [
        {
          name: GameType.Exam,
          value: ExamGameData,
        },
        {
          name: GameType.FlashCard,
          value: FlashCardGameData,
        },
      ],
    },
  })
  data!: GameData;
}

export interface GameAnswerResult {
  state: QuestionState;
  currentQuestionIndex: number;
  currentQuestionRetryCount?: number;
  currentQuestionMaxTime?: Date;
}
