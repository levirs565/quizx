import { AnswerQuestionRequestBody, CreateQuizParameters, Quiz } from '@quizx/shared';
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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuizImporterService } from './quiz.importer.service';
import { CommonServiceException } from 'common/common-service.exception';
import { memoryStorage } from 'multer';

@Controller()
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly quizImporterService: QuizImporterService
  ) {}

  @Get('/')
  async getList() {
    return {
      list: await this.quizService.getQuizList(),
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
    return this.quizService.createQuiz(session, () => param);
  }

  @Post('/import_markdown')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter(_, file, cb) {
        cb(null, file.originalname.endsWith('.md'));
      },
    })
  )
  async importMarkdown(
    @Session() session: SessionType,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (!file) throw new CommonServiceException('File is not accepted');

    return this.quizService.createQuiz(session, () => {
      const markdownText = file.buffer.toString();
      return this.quizImporterService.markdownToQuiz(markdownText);
    });
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
