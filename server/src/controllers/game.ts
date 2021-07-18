import { Request, Response, NextFunction } from 'express';
import * as GameService from '../services/game';

export function playGame(req: Request, res: Response, next: NextFunction) {
  const { soalId, interaktif } = req.body;

  GameService.playGame(req.session, soalId, interaktif)
    .then(game => res.json(game))
    .catch(next);
}

export function getGame(req: Request, res: Response, next: NextFunction) {
  GameService.getGame(req.params.id)
    .then(game => res.json(game))
    .catch(next)
}

export function getAllQuestion(req: Request, res: Response, next: NextFunction) {
  GameService.getAllQuestion(req.session, req.params.gameId)
    .then(questions => res.json(questions))
    .catch(next);
}

export function putAnswer(req: Request, res: Response, next: NextFunction) {
  const { gameId, questionIndex: questionIndexStr } = req.params;
  const questionIndex = parseInt(questionIndexStr)
  const { jawaban } = req.body;

  GameService.putAnswer(req.session, gameId, questionIndex, jawaban)
    .then(result => res.json({ ...result, msg: 'jawaban is saved' }))
    .catch(next);
}

export function finishGame(req: Request, res: Response, next: NextFunction) {
  GameService.finishGame(req.session, req.params.id)
    .then(() => res.json({ msg: 'finished' }))
    .catch(next);
}
