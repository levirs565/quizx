import axios from 'axios';

function throwError(res) {
  let data = res.data;

  if (data.error) {
    console.log(data.error);
    throw data.error;
  } else {
    return data;
  }
}

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export const Quiz = {
  async getQuizList() {
    const res = await instance.get('/soal');
    return throwError(res);
  },
  async getQuiz(id) {
    const res = await instance.get(`/soal/${id}`);
    return throwError(res);
  },
  async getQuestion(quizId, questionId) {
    const res = await instance.get(`/soal/${quizId}/${questionId}`);
    return throwError(res);
  },
  async postAnswer(quizId, questionId, answer) {
    const res = await instance.post(`/soal/${quizId}/${questionId}`, { 
      jawaban: answer 
    });
    return throwError(res);
  },
};

export const User = {
  async signup(id, name, password) {
    const res = await instance.post('/user/signup', { id, name, password });
    return throwError(res);
  },
  async login(id, password) {
    const res = await instance.post('/user/login', { id, password });
    return throwError(res);
  },
  async logout() {
    const res = await instance.post('/user/logout');
    return throwError(res);
  },
  async state() {
    const res = await instance.get('/user/state');
    return throwError(res);
  },
};

export const Game = {
  async startGame(quizId, interactive) {
    const res = await instance.post('/permainan/start', {
      soalId: quizId,
      interaktif: interactive,
    });
    return throwError(res);
  },
  async getAllQuestion(index) {
    const res = await instance.get(`/permainan/soal/`);
    return throwError(res);
  },
  async getQuestion(index) {
    const res = await instance.get(`/permainan/soal/${index}`);
    return throwError(res);
  },
  async putAnswer(index, jawaban) {
    const res = await instance.put(`/permainan/soal/${index}`, { jawaban });
    return throwError(res);
  },
  async stopGame() {
    const res = await instance.post('/permainan/stop');
    return throwError(res);
  },
  async state() {
    const res = await instance.get('/permainan/state');
    return throwError(res);
  },
};

export const QuizAdmin = {
  baseURL: '/admin/soal/',
  async getQuizList() {
    const res = await instance.get(this.baseURL);
    return throwError(res);
  },
  async createQuiz(data) {
    const res = await instance.post(this.baseURL, data);
    return throwError(res);
  },
  async getQuiz(id) {
    const res = await instance.get(this.baseURL + id);
    return throwError(res);
  },
  async editQuiz(id, data) {
    const res = await instance.put(this.baseURL + id, data);
    return throwError(res);
  },
  async removeQuiz(id) {
    const res = await instance.delete(this.baseURL + id);
    return throwError(res);
  },
  async createQuestion(quizId, data) {
    const res = await instance.post(this.baseURL + quizId, data);
    return throwError(res);
  },
  async getQuestion(quizId, questionId) {
    const res = await instance.get(this.baseURL + quizId + '/' + questionId);
    return throwError(res);
  },
  async editQuestion(quizId, questionId, data) {
    const res = await instance.put(this.baseURL + quizId + '/' + questionId, data);
    return throwError(res);
  },
  async removeQuestion(quizId, questionId) {
    const res = await instance.delete(this.baseURL + quizId + '/' + questionId);
    return throwError(res);
  },
};
