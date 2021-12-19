import 'reflect-metadata';
import express, { json } from 'express';
import cors from 'cors';
import sessionMiddleware from './middleware/session';
import errorMiddleware from './middleware/error';
import config from './config';
import { useExpressServer } from 'routing-controllers';
import { UserController } from './controllers/user';
import { QuizController } from './controllers/quiz';
import { GameController } from './controllers/game';
import { MediaController } from './controllers/media';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: config.serverCorsOrigin
  })
);
app.use(json());
app.use(sessionMiddleware);

useExpressServer(app, {
  controllers: [UserController, QuizController, GameController, MediaController],
  defaultErrorHandler: false,
  validation: {
    whitelist: true,
    forbidNonWhitelisted: true,
    strictGroups: true
  }
});

app.use(errorMiddleware);

export default app;
