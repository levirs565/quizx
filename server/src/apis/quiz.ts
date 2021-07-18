import { Router } from 'express';
import { getQuizList, getQuiz, answerQuestion } from '../controllers/quiz';

const route = Router();
route.get('/', getQuizList);
route.get('/:id', getQuiz);
route.post('/:quizId/:questionId', answerQuestion);

export default route;
