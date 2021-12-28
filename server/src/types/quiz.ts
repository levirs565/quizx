import { AutoMap } from '@automapper/classes';
import { DiscriminatorDescriptor, Expose, Type } from 'class-transformer';
import {
  Equals,
  IsArray,
  IsEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ValidationGroups } from 'common/validation-groups.decorator';

export const QuestionValidationGroupWithoutId = 'WithoutId';

export type QuestionAnswer = string | number;

export abstract class Question {
  @IsString()
  @Equals(undefined, {
    groups: [QuestionValidationGroupWithoutId],
  })
  id?: string;
  @IsString({ always: true })
  question!: string;
  /**
   * Only can undefined in Game question
   */
  answer?: QuestionAnswer;
}

export class MultipleChoiceQuestion extends Question {
  @IsArray({ always: true })
  choices!: Array<string>;
  @IsNumber(undefined, { always: true })
  answer?: number;
}

export class ShortTextQuestion extends Question {
  @IsString({ always: true })
  answer?: string;
}

export class NumberQuestion extends Question {
  @IsNumber(undefined, { always: true })
  answer?: number;
}

export class MathQuestion extends Question {
  @IsString({ always: true })
  answer?: string;
}

export const questionDiscriminator: DiscriminatorDescriptor = {
  property: 'type',
  subTypes: [
    {
      value: MultipleChoiceQuestion,
      name: 'multiple-choice',
    },
    {
      value: ShortTextQuestion,
      name: 'short-text',
    },
    {
      value: NumberQuestion,
      name: 'number',
    },
    {
      value: MathQuestion,
      name: 'math',
    },
  ],
};
abstract class BaseQuiz {
  @AutoMap()
  @IsString()
  id!: string;
  @AutoMap()
  @IsString()
  userId!: string;
  @AutoMap()
  @IsString()
  title!: string;
}

export class QuizSummary extends BaseQuiz {
  @IsNumber()
  questionCount!: number;
}

export class Quiz extends BaseQuiz {
  @ValidateNested()
  @Type(() => Question, {
    discriminator: questionDiscriminator,
  })
  questions!: Array<Question>;
}

export interface SaveQuizResult {
  newQuestionsId: {
    [oldId: string]: string;
  };
}

export interface AnswerQuestionResult {
  correct?: boolean;
}

export interface AnswerQuestionRequestBody {
  answer: QuestionAnswer | null;
}

@ValidationGroups([QuestionValidationGroupWithoutId])
export class CreateQuizParameters {
  @IsString({ always: true })
  title!: string;
  @ValidateNested({ always: true })
  @Type(() => Question, {
    discriminator: questionDiscriminator,
  })
  questions?: Array<Question>;
}

export interface CreateQuizResult {
  id: string;
}
