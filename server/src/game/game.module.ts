import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModelName, GameSchema } from '../schemas/game.schema.js';
import { GameController } from './game.controller.js';
import { GameService } from './game.service.js';
import { QuizModule } from '../quiz/quiz.module.js';
import { GameMapperProfile } from './game.mapper-profile.js';
import { GameRepository } from './game.repository.js';

@Module({
  imports: [QuizModule, MongooseModule.forFeature([{ name: GameModelName, schema: GameSchema }])],
  controllers: [GameController],
  providers: [GameService, GameMapperProfile, GameRepository],
})
export class GameModule {}
