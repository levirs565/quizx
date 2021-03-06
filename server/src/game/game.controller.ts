import { PlayGameRequestBody } from '../types/game';
import { AnswerQuestionRequestBody } from '../types/quiz';
import { GameService } from './game.service';
import SessionType from '../types/session';
import { ActionInterceptor } from '../common/action.interceptor';
import { Body, Controller, Get, Param, Post, Put, Session, UseInterceptors } from '@nestjs/common';

@Controller()
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/play')
  play(@Session() session: SessionType, @Body() { quizId, preference }: PlayGameRequestBody) {
    return this.gameService.playGame(session, quizId, preference);
  }

  @Get('/:id')
  get(@Param('id') id: string) {
    return this.gameService.getGame(id);
  }

  @Put('/:gameId/question/:questionId')
  putAnswer(
    @Session() session: SessionType,
    @Param('gameId') gameId: string,
    @Param('questionId') questionId: string,
    @Body() { answer }: AnswerQuestionRequestBody
  ) {
    return this.gameService.putAnswer(session, gameId, questionId, answer);
  }

  @Post('/:gameId/question/:questionId')
  submitAnswer(
    @Session() session: SessionType,
    @Param('gameId') gameId: string,
    @Param('questionId') questionId: string
  ) {
    return this.gameService.submitAnswer(session, gameId, questionId);
  }

  @Post('/:id/finish')
  @UseInterceptors(ActionInterceptor)
  finish(@Session() session: SessionType, @Param('id') id: string) {
    return this.gameService.finishGame(session, id);
  }
}
