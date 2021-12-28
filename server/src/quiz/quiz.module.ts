import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizModelName, QuizSchema } from 'schemas/quiz.schema';
import { QuizController } from './quiz.controller';
import { QuizMapperProfile } from './quiz.mapper-profile';
import { QuizService } from './quiz.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: QuizModelName, schema: QuizSchema }])],
  controllers: [QuizController],
  providers: [QuizService, QuizMapperProfile],
  exports: [QuizService],
})
export class QuizModule {}
