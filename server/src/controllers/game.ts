import { PlayGameRequestBody } from '../types/game';
import { AnswerQuestionRequestBody } from '../types/quiz';
import * as GameService from '../services/game';
import {
  Body,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  Session,
  UseInterceptor
} from 'routing-controllers';
import SessionType from '../types/session';
import { ActionInterceptor } from '../interceptors/action';

@JsonController('/game')
export class GameController {
  @Post('/play')
  play(@Session() session: SessionType, @Body() { quizId, ...preference }: PlayGameRequestBody) {
    return GameService.playGame(session, quizId, preference);
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return GameService.getGame(id);
  }

  @Put('/:gameId/question/:questionId')
  putAnswer(
    @Session() session: SessionType,
    @Param('gameId') gameId: string,
    @Param('questionId') questionId: string,
    @Body() { answer }: AnswerQuestionRequestBody
  ) {
    return GameService.putAnswer(session, gameId, questionId, answer);
  }

  @Post('/:id/finish')
  @UseInterceptor(ActionInterceptor)
  finish(@Session() session: SessionType, @Param('id') id: string) {
    return GameService.finishGame(session, id);
  }
}
