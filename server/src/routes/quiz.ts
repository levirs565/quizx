import { Router } from 'express';
import {
  getQuizList,
  getQuiz,
  answerQuestion,
  createQuiz,
  getQuizForEditor,
  deleteQuiz,
  saveQuiz
} from '../controllers/quiz';

const route = Router();
route.get('/', getQuizList);
route.post('/', createQuiz);
route.get('/:id', getQuiz);
route.delete('/:id', deleteQuiz);
route.get('/:id/edit', getQuizForEditor);
route.put('/:id/edit/', saveQuiz)
route.post('/:quizId/:questionId/check', answerQuestion);

export default route;
