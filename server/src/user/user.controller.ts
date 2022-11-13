import { Body, Controller, Get, Post, Session, UseInterceptors } from '@nestjs/common';
import { ActionInterceptor } from '../common/action.interceptor';
import { UserService } from './user.service';
import SessionType from '../types/session';
import { SignupRequestBody, LoginRequestBody } from '@quizx/shared';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @UseInterceptors(ActionInterceptor)
  signup(@Session() session: SessionType, @Body() { id, name, password }: SignupRequestBody) {
    return this.userService.signup(id, name, password);
  }

  @Post('/login')
  @UseInterceptors(ActionInterceptor)
  login(@Session() session: SessionType, @Body() { id, password }: LoginRequestBody) {
    return this.userService.login(id, password, session);
  }

  @Post('/logout')
  @UseInterceptors(ActionInterceptor)
  logout(@Session() session: SessionType) {
    return this.userService.logout(session);
  }

  @Get('/state')
  getState(@Session() session: SessionType) {
    return this.userService.getState(session);
  }
}
