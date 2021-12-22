import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { GameModule } from './game/game.module';
import { MediaModule } from './media/media.module';
import { QuizModule } from './quiz/quiz.module';
import { UserModule } from './user/user.module';
import { AppConfigModule } from './app.config.module';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from './app.config.service';
import { Connection } from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfig: AppConfigService) => ({
        uri: appConfig.dbUri
      }),
      inject: [AppConfigService]
    }),
    AutomapperModule.forRoot({
      options: [{ name: 'mapper', pluginInitializer: classes }],
      singular: true
    }),
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'user',
            module: UserModule
          },
          {
            path: 'quiz',
            module: QuizModule
          },
          {
            path: 'game',
            module: GameModule
          }
        ]
      },
      {
        path: 'media',
        module: MediaModule
      }
    ]),
    UserModule,
    QuizModule,
    GameModule,
    MediaModule
  ]
})
export class AppModule implements NestModule {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly appConfig: AppConfigService
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new MongoStore({
            client: this.connection.getClient()
          }),
          secret: this.appConfig.sessionSecret,
          resave: true,
          saveUninitialized: false
        })
      )
      .forRoutes('*');
  }
}
