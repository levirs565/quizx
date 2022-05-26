import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModelName, QuizSchema } from 'schemas/quiz.schema';
import { QuizController } from './quiz.controller';
import { QuizImporterService } from './quiz.importer.service';
import { QuizMapperProfile } from './quiz.mapper-profile';
import { QuizRepository } from './quiz.repository';
import { QuizService } from './quiz.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: QuizModelName, schema: QuizSchema }])],
  controllers: [QuizController],
  providers: [QuizService, QuizMapperProfile, QuizRepository, QuizImporterService],
  exports: [QuizRepository, QuizService],
})
export class QuizModule {}
