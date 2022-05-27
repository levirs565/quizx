import axios from "axios";

function throwError(res: any) {
  const data = res.data;

  if (data.error) {
    console.log(data.error);
    throw data.error;
  } else {
    return data;
  }
}

const baseURL = "/";
const instance = axios.create({
  baseURL,
  withCredentials: true,
});

class QuizApi {
  path = "/api/quiz";

  async getQuizList() {
    const res = await instance.get(this.path);
    return throwError(res);
  }
  async getQuiz(id: string) {
    const res = await instance.get(`${this.path}/${id}`);
    return throwError(res);
  }
  async checkQuestionAnswer(
    quizId: string,
    questionId: string,
    answer: string | number | null
  ) {
    const res = await instance.post(
      `${this.path}/${quizId}/${questionId}/check`,
      {
        answer,
      }
    );
    return throwError(res);
  }
  async createQuiz(data: any) {
    const res = await instance.post(this.path, data);
    return throwError(res);
  }
  async importMarkdown(file: Blob) {
    const form = new FormData();
    form.append("file", file);
    return throwError(
      await instance.post(`${this.path}/import_markdown`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  }
  async getQuizForEditor(id: string) {
    const res = await instance.get(`${this.path}/${id}/edit`);
    return throwError(res);
  }
  async saveQuiz(id: string, quiz: any) {
    const res = await instance.put(`${this.path}/${id}/edit`, quiz);
    return throwError(res);
  }
  async deleteQuiz(id: string) {
    const res = await instance.delete(`${this.path}/${id}`);
    return throwError(res);
  }
}
export const Quiz = new QuizApi();

export const User = {
  async signup(id: string, name: string, password: string) {
    const res = await instance.post("/api/user/signup", { id, name, password });
    return throwError(res);
  },
  async login(id: string, password: string) {
    const res = await instance.post("/api/user/login", { id, password });
    return throwError(res);
  },
  async logout() {
    const res = await instance.post("/api/user/logout");
    return throwError(res);
  },
  async state() {
    const res = await instance.get("/api/user/state");
    return throwError(res);
  },
};

export const Game = {
  async playGame(quizId: string, preference: any) {
    const res = await instance.post("/api/game/play", {
      quizId,
      preference,
    });
    return throwError(res);
  },
  async getGame(id: string) {
    const res = await instance.get(`/api/game/${id}`);
    return throwError(res);
  },
  async putAnswer(
    gameId: string,
    questionIndex: string,
    answer: string | number | null
  ) {
    const res = await instance.put(
      `/api/game/${gameId}/question/${questionIndex}`,
      { answer }
    );
    return throwError(res);
  },
  async submitAnswer(gameId: string, questionId: string) {
    const res = await instance.post(
      `/api/game/${gameId}/question/${questionId}`
    );
    return throwError(res);
  },
  async finishGame(gameId: string) {
    const res = await instance.post(`/api/game/${gameId}/finish`);
    return throwError(res);
  },
};

export class MediaApi {
  path = "/media";

  async upload(id: string, file: Blob) {
    const rootPath = `${this.path}/quiz/${id}`;
    const formData = new FormData();
    formData.append("file", file);
    const res = throwError(
      await instance.post(rootPath, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
    return res;
  }
}

export const Media = new MediaApi();
