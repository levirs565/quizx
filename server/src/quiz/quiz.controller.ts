import { AnswerQuestionRequestBody, CreateQuizParameters, Quiz } from '@quizx/shared';
import { QuizService } from './quiz.service.js';
import SessionType from '../types/session.js';
import { ActionInterceptor } from '../common/action.interceptor.js';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuizImporterService } from './quiz.importer.service.js';
import { CommonServiceException } from '../common/common-service.exception.js';
import { memoryStorage } from 'multer';

const markdownMime = 'text/markdown';
const docxMime = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

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
    return this.quizService.createQuiz(session, () => Promise.resolve(param));
  }

  @Post('/import_document')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
    })
  )
  async importDocument(
    @Session() session: SessionType,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp(
            [markdownMime, docxMime]
              .map((x) => x.replace(/\//g, '\\/').replace(/\./g, '\\.'))
              .map((x) => `(${x})`)
              .join('|')
          ),
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1000, // 1 mb
        })
        .build({
          fileIsRequired: true,
          exceptionFactory: (error) => new CommonServiceException(error),
        })
    )
    file: Express.Multer.File
  ) {
    return this.quizService.createQuiz(session, () => {
      if (file.mimetype == markdownMime)
        return this.quizImporterService.markdownToQuiz(file.buffer.toString());
      else if (file.mimetype == docxMime) return this.quizImporterService.docxToQuiz(file.buffer);
      else throw new CommonServiceException('Unknown document mime');
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
