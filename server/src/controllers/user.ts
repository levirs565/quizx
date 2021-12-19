import { Body, Get, JsonController, Post, Session, UseInterceptor } from 'routing-controllers';
import { ActionInterceptor } from '../interceptors/action';
import UserService from '../services/user';
import SessionType from '../types/session';
import { SignupRequestBody, LoginRequestBody } from '../types/user';
@JsonController('/api/user')
export class UserController {
  @Post('/signup')
  @UseInterceptor(ActionInterceptor)
  signup(@Session() session: SessionType, @Body() { id, name, password }: SignupRequestBody) {
    return UserService.signup(id, name, password);
  }

  @Post('/login')
  @UseInterceptor(ActionInterceptor)
  login(@Session() session: SessionType, @Body() { id, password }: LoginRequestBody) {
    return UserService.login(id, password, session);
  }

  @Post('/logout')
  @UseInterceptor(ActionInterceptor)
  logout(@Session() session: SessionType) {
    return UserService.logout(session);
  }

  @Get('/state')
  getState(@Session() session: SessionType) {
    return UserService.getState(session);
  }
}
