import { SchemaDefinition } from "./base"

export interface GamePreference {
  shuffleQuestions: boolean;
}

export interface PlayGameRequestBody extends GamePreference {
  quizId: string;
  isInteractive: boolean;
}

export interface GameResult {
  notAnswered: number;
  correct: number;
  wrong: number;
}

export interface Game extends GamePreference {
  id: string;
  quizId: string;
  quizTitle: string;
  isPlaying: boolean;
  isInteractive: boolean;
  result?: GameResult;
}

// Begin Generated Schema Definition
export const PlayGameRequestBody: SchemaDefinition<PlayGameRequestBody> = {
  name: "PlayGameRequestBody"
}
export const GameResult: SchemaDefinition<GameResult> = {
  name: "GameResult"
}
export const Game: SchemaDefinition<Game> = {
  name: "Game"
}
// End Generated Schema Definition