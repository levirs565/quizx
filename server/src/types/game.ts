import { SchemaDefinition } from './base';
import { QuestionOptionalAnswer } from './quiz';

export interface GamePreference {
  isInteractive: boolean;
  shuffleQuestions: boolean;
}

export interface PlayGameRequestBody extends GamePreference {
  quizId: string;
}

export enum QuestionState {
  Correct,
  Incorrect,
  Unanswered
}

export interface GameResult {
  notAnswered: number;
  correct: number;
  wrong: number;
  questionsState: Array<QuestionState>;
}

export interface GameSummary extends GamePreference {
  id: string;
  userId: string;
  quizId: string;
  quizTitle: string;
  isPlaying: boolean;
  result?: GameResult;
}

export interface Game extends GameSummary {
  questions: Array<QuestionOptionalAnswer>;
  correctAnswers?: Array<number>;
}

// Begin Generated Schema Definition
export const GamePreference: SchemaDefinition<GamePreference> = {
  name: "GamePreference"
}
export const PlayGameRequestBody: SchemaDefinition<PlayGameRequestBody> = {
  name: "PlayGameRequestBody"
}
export const GameResult: SchemaDefinition<GameResult> = {
  name: "GameResult"
}
export const GameSummary: SchemaDefinition<GameSummary> = {
  name: "GameSummary"
}
export const Game: SchemaDefinition<Game> = {
  name: "Game"
}
// End Generated Schema Definition