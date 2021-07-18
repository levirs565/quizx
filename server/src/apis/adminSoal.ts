import { Router } from 'express';
import {
  getQuizList,
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
route.get('/:id', getQuizForEditor);
route.put('/:id', renameQuizTitle);
route.delete('/:id', deleteQuiz);
route.post('/:quizId', addQuestion);
route.put('/:quizId/:questionId', editQuestion);
route.delete('/:quizId/:questionId', deleteQuestion);

export default route;
