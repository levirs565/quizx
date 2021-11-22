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

class QuizApi {
  path = "/quiz"

  async getQuizList() {
    const res = await instance.get(this.path);
    return throwError(res);
  }
  async getQuiz(id) {
    const res = await instance.get(`${this.path}/${id}`);
    return throwError(res);
  }
  async checkQuestionAnswer(quizId, questionId, answer) {
    const res = await instance.post(`${this.path}/${quizId}/${questionId}/check`, { 
      answer 
    });
    return throwError(res);
  }
  async createQuiz(data) {
    const res = await instance.post(this.path, data);
    return throwError(res);
  }
  async getQuizForEditor(id) {
    const res = await instance.get(`${this.path}/${id}/edit`);
    return throwError(res);
  }
  async saveQuiz(id, quiz) {
    const res = await instance.put(`${this.path}/${id}/edit`, quiz)
    return throwError(res)
  }
  async deleteQuiz(id) {
    const res = await instance.delete(`${this.path}/${id}`);
    return throwError(res);
  }
}
export const Quiz = new QuizApi()

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
  async playGame(quizId, preference) {
    const res = await instance.post('/game/play', {
      quizId,
      ...preference,
    });
    return throwError(res);
  },
  async getGame(id) {
    const res = await instance.get(`/game/${id}`)
    return throwError(res)
  },
  async putAnswer(gameId, questionIndex, answer) {
    const res = await instance.put(`/game/${gameId}/question/${questionIndex}`, { answer });
    return throwError(res);
  },
  async finishGame(gameId) {
    const res = await instance.post(`/game/${gameId}/finish`);
    return throwError(res);
  },
};
