import { Router } from 'express';
import {
  getQuizList,
  getQuiz,
  answerQuestion,
  createQuiz,
  getQuizForEditor,
  renameQuizTitle,
  deleteQuiz,
  addQuestion,
  editQuestion,
  deleteQuestion,
} from '../controllers/quiz';

const route = Router();
route.get('/', getQuizList);
route.post('/', createQuiz);
route.get('/:id', getQuiz);
route.delete('/:id', deleteQuiz);
route.post('/:quizId', addQuestion);
route.get('/:id/edit', getQuizForEditor);
route.put('/:id/rename', renameQuizTitle);
route.put('/:quizId/:questionId', editQuestion);
route.delete('/:quizId/:questionId', deleteQuestion);
route.post('/:quizId/:questionId/check', answerQuestion);

export default route;
