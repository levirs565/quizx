import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModelName, GameSchema } from 'schemas/game.schema';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { QuizModule } from 'quiz/quiz.module';
import { GameMapperProfile } from './game.mapper-profile';
import { GameRepository } from './game.repository';

@Module({
  imports: [QuizModule, MongooseModule.forFeature([{ name: GameModelName, schema: GameSchema }])],
  controllers: [GameController],
  providers: [GameService, GameMapperProfile, GameRepository],
})
export class GameModule {}
