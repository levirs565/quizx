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
      jawaban: answer 
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
  async renameQuizTitle(id, data) {
    const res = await instance.put(`${this.path}/${id}/rename`, data);
    return throwError(res);
  }
  async deleteQuiz(id) {
    const res = await instance.delete(`${this.path}/${id}`);
    return throwError(res);
  }
  async addQuestion(quizId, data) {
    const res = await instance.post(`${this.path}/${quizId}`, data);
    return throwError(res);
  }
  async editQuestion(quizId, questionId, data) {
    const res = await instance.put(`${this.path}/${quizId}/${questionId}`, data);
    return throwError(res);
  }
  async deleteQuestion(quizId, questionId) {
    const res = await instance.delete(`${this.path}/${quizId}/${questionId}`);
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
