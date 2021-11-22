import { Router } from 'express';
import {
  playGame,
  getGame,
  putAnswer,
  finishGame,
} from '../controllers/game';

const route = Router();
route.post('/play', playGame);
route.get('/:id', getGame);
route.put('/:gameId/question/:questionId', putAnswer);
route.post('/:id/finish', finishGame);

export default route
