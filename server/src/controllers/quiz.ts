import {
  AnswerQuestionRequestBody,
  CreateQuizParameters,
  Quiz,
  QuestionValidationGroupWithoutId
} from '../types/quiz';
import QuizService from '../services/quiz';
import SessionType from '../types/session';
import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Res,
  ResponseClassTransformOptions,
  Session,
  UploadedFile,
  UseInterceptor
} from 'routing-controllers';
import { ActionInterceptor } from '../interceptors/action';

@JsonController('/api/quiz')
export class QuizController {
  @Get('/')
  async getList() {
    return {
      list: await QuizService.getQuizList()
    };
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return QuizService.getQuiz(id);
  }

  @Post('/:quizId/:questionId/check')
  answerQuestion(
    @Param('quizId') quizId: string,
    @Param('questionId') questionId: string,
    @Body() { answer }: AnswerQuestionRequestBody
  ) {
    return QuizService.answerQuestion(quizId, questionId, answer);
  }

  @Post('/')
  async createOne(
    @Session() session: SessionType,
    @Body({
      validate: {
        groups: [QuestionValidationGroupWithoutId]
      }
    })
    param: CreateQuizParameters
  ) {
    return QuizService.createQuiz(session, param);
  }

  @Get('/:id/edit')
  getOneForEditor(@Session() session: SessionType, @Param('id') id: string) {
    return QuizService.getQuizForEditor(session, id);
  }

  @Put('/:id/edit')
  save(@Session() session: SessionType, @Param('id') id: string, @Body() quiz: Quiz) {
    return QuizService.saveQuiz(session, id, quiz);
  }

  @Delete('/:id')
  @UseInterceptor(ActionInterceptor)
  delete(@Session() session: SessionType, @Param('id') id: string) {
    return QuizService.deleteQuiz(session, id);
  }
}
