import { Router } from 'express';
import { signup, login, logout, state } from '../controllers/user';

const route = Router();
route.post('/signup', signup);
route.post('/login', login);
route.post('/logout', logout);
route.get('/state', state);

export default route;
