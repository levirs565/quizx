import { Request, Response, Router }from 'express';
import QuizRoutes from './quiz'
import UserRoutes from './user'
import GameRoutes from './game'

const route = Router();
route.get('/test', (_req: Request, res: Response) => {
  res.json({
    err: null,
    msg: 'Server sedang berjalan'
  });
});

route.use('/quiz', QuizRoutes);
route.use('/user', UserRoutes);
route.use('/game', GameRoutes);

export default route;
