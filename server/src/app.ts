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
  routePrefix: '/api',
  controllers: [UserController, QuizController, GameController],
  defaultErrorHandler: false
});

app.use(errorMiddleware);

export default app;
