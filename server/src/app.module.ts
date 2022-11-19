import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { HttpAdapterHost, RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GameModule } from './game/game.module.js';
import { MediaModule } from './media/media.module.js';
import { QuizModule } from './quiz/quiz.module.js';
import { UserModule } from './user/user.module.js';
import { AppConfigModule } from './app.config.module.js';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from './app.config.service.js';
import Mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(path.dirname(fileURLToPath(import.meta.url)), '../../client/dist'),
      exclude: ['/api/(.*)', '/media/(.*)'],
    }),
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfig: AppConfigService) => ({
        uri: appConfig.dbUri,
        retryAttempts: Infinity,
      }),
      inject: [AppConfigService],
    }),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'user',
            module: UserModule,
          },
          {
            path: 'quiz',
            module: QuizModule,
          },
          {
            path: 'game',
            module: GameModule,
          },
        ],
      },
      {
        path: 'media',
        module: MediaModule,
      },
    ]),
    UserModule,
    QuizModule,
    GameModule,
    MediaModule,
  ],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(
    @InjectConnection() private readonly connection: Mongoose.Connection,
    private readonly appConfig: AppConfigService,
    private readonly httpAdapterHost: HttpAdapterHost
  ) {}

  onModuleInit() {
    const app: express.Application = this.httpAdapterHost.httpAdapter.getInstance();
    app.use('/media', express.static(this.appConfig.storagePath), () => {
      throw new NotFoundException('Media not found');
    });
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new MongoStore({
            client: this.connection.getClient(),
          }),
          secret: this.appConfig.sessionSecret,
          resave: true,
          saveUninitialized: false,
        })
      )
      .forRoutes('*');
  }
}
