import { NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { instanceToPlain } from 'class-transformer';
import { GameModelName } from 'schemas/game.schema';
import { BaseModel, BaseModelMethods } from 'schemas/helper';
import { FlashCardGameData, Game, GameResult, GameType, QuestionState } from 'types/game';
import { QuestionAnswer } from 'types/quiz';

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

  async updateQuestionAnswer(id: string, index: number, answer?: QuestionAnswer) {
    await this.gameModel.updateOne(
      { _id: id },
      {
        $set: {
          [`questions.${index}.answer`]: answer,
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
