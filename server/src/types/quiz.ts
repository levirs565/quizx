import { SchemaDefinition } from "./base"

export interface AnswerQuestionResult {
  correct?: boolean; 
}

export interface AnswerQuestionRequestBody {
  answer: number
}

export interface CreateRenameQuizRequestBody {
  title: string 
}

export interface Question {
  id: string;
  question: string;
  choices: Array<string>
}

export interface QuestionWAnswer extends Question {
  answer: number
}

export type QuestionWAnswerWoId = Omit<QuestionWAnswer, 'id'>


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
    [oldId: string]: string
  }
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
export const QuestionWAnswerWoId: SchemaDefinition<QuestionWAnswerWoId> = {
  name: "QuestionWAnswerWoId"
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