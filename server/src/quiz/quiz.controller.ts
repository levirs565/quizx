import {
  AnswerQuestionRequestBody,
  CreateQuizParameters,
  Quiz,
  QuestionValidationGroupWithoutId
} from '../types/quiz';
import { QuizService } from './quiz.service';
import SessionType from '../types/session';
import { ActionInterceptor } from '../common/action.interceptor';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Session,
  UseInterceptors
} from '@nestjs/common';

@Controller()
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('/')
  async getList() {
    return {
      list: await this.quizService.getQuizList()
    };
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.quizService.getQuiz(id);
  }

  @Post('/:quizId/:questionId/check')
  answerQuestion(
    @Param('quizId') quizId: string,
    @Param('questionId') questionId: string,
    @Body() { answer }: AnswerQuestionRequestBody
  ) {
    return this.quizService.answerQuestion(quizId, questionId, answer);
  }

  @Post('/')
  async createOne(@Session() session: SessionType, @Body() param: CreateQuizParameters) {
    return this.quizService.createQuiz(session, param);
  }

  @Get('/:id/edit')
  getOneForEditor(@Session() session: SessionType, @Param('id') id: string) {
    return this.quizService.getQuizForEditor(session, id);
  }

  @Put('/:id/edit')
  save(@Session() session: SessionType, @Param('id') id: string, @Body() quiz: Quiz) {
    return this.quizService.saveQuiz(session, id, quiz);
  }

  @Delete('/:id')
  @UseInterceptors(ActionInterceptor)
  delete(@Session() session: SessionType, @Param('id') id: string) {
    return this.quizService.deleteQuiz(session, id);
  }
}
