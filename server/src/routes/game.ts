import { Router } from 'express';
import {
  playGame,
  getGame,
  getAllQuestion,
  putAnswer,
  finishGame,
} from '../controllers/game';

const route = Router();
route.post('/play', playGame);
route.get('/:id', getGame);
route.get('/:gameId/question', getAllQuestion);
route.put('/:gameId/question/:questionId', putAnswer);
route.post('/:id/finish', finishGame);

export default route
