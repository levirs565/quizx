import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { GameModelName } from '../schemas/game.schema.js';
import { BaseModel } from '../schemas/helper.js';
import {
  FlashCardGameData,
  Game,
  GameResult,
  GameType,
  QuestionState,
  QuestionAnswer,
} from '@quizx/shared';

export class GameRepository {
  constructor(@InjectModel(GameModelName) private readonly gameModel: BaseModel<Game>) {}

  async hasPlayed(userId: string): Promise<boolean> {
    const playedGame = await this.gameModel.findOne({ userId, isPlaying: true });
    if (playedGame) return true;
    return false;
  }

  async getById(id: string): Promise<Game> {
    const game = await this.gameModel.findOne({ _id: id });

    if (game) return game.toClass();

    throw new NotFoundException('Game not found');
  }

  async createOne(game: Game) {
    const gameDb = new this.gameModel(instanceToPlain(game));
    await gameDb.save();
    game.id = gameDb.id;
  }

  async updateQuestionAnswer(id: string, index: number, answer: QuestionAnswer | undefined) {
    const key = `questions.${index}.answer`;
    if (answer === undefined)
      await this.gameModel.updateOne(
        { _id: id },
        {
          $unset: {
            [key]: '',
          },
        },
        {
          strict: false,
        }
      );
    else
      await this.gameModel.updateOne(
        { _id: id },
        {
          $set: {
            [key]: answer,
          },
        },
        {
          strict: false,
        }
      );
  }

  async updateFlashCard(id: string, data: FlashCardGameData, stateToPush?: QuestionState) {
    await this.gameModel.updateOne(
      { _id: id },
      {
        $set: {
          data: {
            type: GameType.FlashCard,
            ...instanceToPlain(data),
          },
        },
        $push: {
          questionsState: stateToPush,
        },
      }
    );
  }

  async updateFinish(id: string, questionsState: Array<QuestionState>, result: GameResult) {
    await this.gameModel.updateOne(
      { _id: id },
      {
        $set: {
          isPlaying: false,
          questionsState,
          result,
        },
      }
    );
  }
}
