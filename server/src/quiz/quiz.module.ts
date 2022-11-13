import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModelName, QuizSchema } from '../schemas/quiz.schema.js';
import { QuizController } from './quiz.controller.js';
import { QuizImporterService } from './quiz.importer.service.js';
import { QuizMapperProfile } from './quiz.mapper-profile.js';
import { QuizRepository } from './quiz.repository.js';
import { QuizService } from './quiz.service.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: QuizModelName, schema: QuizSchema }])],
  controllers: [QuizController],
  providers: [QuizService, QuizMapperProfile, QuizRepository, QuizImporterService],
  exports: [QuizRepository, QuizService],
})
export class QuizModule {}
