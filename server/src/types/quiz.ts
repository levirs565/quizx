import { SchemaDefinition } from './base';

export interface AnswerQuestionResult {
  correct?: boolean;
}

export interface AnswerQuestionRequestBody {
  answer: number | string | null;
}

export interface CreateRenameQuizRequestBody {
  title: string;
}

interface BaseQuestion {
  id: string;
  question: string;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice';
  choices: Array<string>;
  answer: number;
}

interface ShortTextQuestion extends BaseQuestion {
  type: 'short-text';
  answer: string;
}

interface NumberQuestion extends BaseQuestion {
  type: 'number';
  answer: number;
}

interface MathQuestion extends BaseQuestion {
  type: 'math';
  answer: string;
}

type OmitAnswer<K> = Omit<K, 'answer'>;

type OptionalAnswer<K extends { answer: any }> = Omit<K, 'answer'> & Partial<Pick<K, 'answer'>>;

export type Question =
  | OmitAnswer<MultipleChoiceQuestion>
  | OmitAnswer<ShortTextQuestion>
  | OmitAnswer<NumberQuestion>
  | OmitAnswer<MathQuestion>;

export type QuestionWAnswer = MultipleChoiceQuestion | ShortTextQuestion | NumberQuestion | MathQuestion;

export type QuestionOptionalAnswer =
  | OptionalAnswer<MultipleChoiceQuestion>
  | OptionalAnswer<ShortTextQuestion>
  | OptionalAnswer<NumberQuestion>
  | OptionalAnswer<MathQuestion>;

interface BaseQuiz {
  id: string;
  userId: string;
  title: string;
}

export interface QuizSummary extends BaseQuiz {
  questionCount: number;
}

export interface Quiz extends BaseQuiz {
  questions: Array<Question>;
}

export interface QuizWAnswer extends BaseQuiz {
  questions: Array<QuestionWAnswer>;
}

export interface SaveQuizResult {
  newQuestionsId: {
    [oldId: string]: string;
  };
}
// Begin Generated Schema Definition
export const AnswerQuestionResult: SchemaDefinition<AnswerQuestionResult> = {
  name: "AnswerQuestionResult"
}
export const AnswerQuestionRequestBody: SchemaDefinition<AnswerQuestionRequestBody> = {
  name: "AnswerQuestionRequestBody"
}
export const CreateRenameQuizRequestBody: SchemaDefinition<CreateRenameQuizRequestBody> = {
  name: "CreateRenameQuizRequestBody"
}
export const Question: SchemaDefinition<Question> = {
  name: "Question"
}
export const QuestionWAnswer: SchemaDefinition<QuestionWAnswer> = {
  name: "QuestionWAnswer"
}
export const QuestionOptionalAnswer: SchemaDefinition<QuestionOptionalAnswer> = {
  name: "QuestionOptionalAnswer"
}
export const QuizSummary: SchemaDefinition<QuizSummary> = {
  name: "QuizSummary"
}
export const Quiz: SchemaDefinition<Quiz> = {
  name: "Quiz"
}
export const QuizWAnswer: SchemaDefinition<QuizWAnswer> = {
  name: "QuizWAnswer"
}
export const SaveQuizResult: SchemaDefinition<SaveQuizResult> = {
  name: "SaveQuizResult"
}
// End Generated Schema Definition