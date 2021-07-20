import express, { json } from 'express';
import cors from 'cors';
import sessionMiddleware from './middleware/session';
import errorMiddleware from './middleware/error';
import Routes from './routes';

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.SERVER_CORS_ORIGIN
  })
);
app.use(json());
app.use(sessionMiddleware);

app.use('/api', Routes);

app.use(errorMiddleware)

export default app;
