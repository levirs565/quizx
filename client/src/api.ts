import axios, { AxiosResponse } from "axios";
import {
  AnswerQuestionRequestBody,
  AnswerQuestionResult,
  ErrorResponse,
  QuestionAnswer,
  Quiz,
  QuizSummary,
  CreateQuizResult,
  CreateQuizParameters,
  SaveQuizResult,
  ActionSuccessResponse,
  SignupRequestBody,
  LoginRequestBody,
  UserState,
  PlayGameRequestBody,
  GameSummary,
  GamePreference,
  GameAnswerResult,
  UploadMediaResponse,
  Game,
} from "@quizx/shared";
import {
  plainToInstance,
  instanceToPlain,
  ClassConstructor,
} from "class-transformer";

function isError(data: any): data is ErrorResponse {
  return Object.hasOwn(data, "error");
}

function responseToClass<T>(
  c: ClassConstructor<T>,
  response: AxiosResponse<T>
): T {
  return plainToInstance(c, response.data);
}

function responseToClassList<T>(
  c: ClassConstructor<T>,
  response: AxiosResponse<{
    list: T[];
  }>
): T[] {
  return response.data.list.map((v) => plainToInstance(c, v));
}

const baseURL = "/";
const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (res: AxiosResponse<ErrorResponse | any>) => {
    if (isError(res.data)) {
      throw res.data.error;
    }
    return res;
  }
);

class UserApi {
  path = "/api/user";

  async signup(id: string, name: string, password: string) {
    const body = new SignupRequestBody(id, password, name);
    return (
      await instance.post<ActionSuccessResponse>(
        `${this.path}/signup`,
        instanceToPlain(body)
      )
    ).data;
  }
  async login(id: string, password: string) {
    const body = new LoginRequestBody(id, password);
    return (
      await instance.post<ActionSuccessResponse>(
        `${this.path}/login`,
        instanceToPlain(body)
      )
    ).data;
  }
  async logout() {
    return (await instance.post<ActionSuccessResponse>(`${this.path}/logout`))
      .data;
  }
  async state() {
    return (await instance.get<UserState>(`${this.path}/state`)).data;
  }
}

export const userApi = new UserApi();
class QuizApi {
  path = "/api/quiz";

  async getQuizList() {
    return responseToClassList(QuizSummary, await instance.get(this.path));
  }
  async getQuiz(id: string) {
    return responseToClass(Quiz, await instance.get(`${this.path}/${id}`));
  }
  async checkQuestionAnswer(
    quizId: string,
    questionId: string,
    answer: QuestionAnswer | undefined
  ) {
    const body: AnswerQuestionRequestBody = {
      answer,
    };
    return (
      await instance.post<AnswerQuestionResult>(
        `${this.path}/${quizId}/${questionId}/check`,
        body
      )
    ).data;
  }
  async createQuiz(data: CreateQuizParameters) {
    return (
      await instance.post<CreateQuizResult>(this.path, instanceToPlain(data))
    ).data;
  }
  async importMarkdown(file: Blob) {
    const form = new FormData();
    form.append("file", file);
    return (
      await instance.post<CreateQuizResult>(
        `${this.path}/import_markdown`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
    ).data;
  }
  async getQuizForEditor(id: string) {
    return responseToClass(Quiz, await instance.get(`${this.path}/${id}/edit`));
  }
  async saveQuiz(id: string, quiz: Quiz) {
    return (
      await instance.put<SaveQuizResult>(
        `${this.path}/${id}/edit`,
        instanceToPlain(quiz)
      )
    ).data;
  }
  async deleteQuiz(id: string) {
    return (await instance.delete<ActionSuccessResponse>(`${this.path}/${id}`))
      .data;
  }
}

export const quizApi = new QuizApi();
class GameApi {
  path = "/api/game";
  async playGame(quizId: string, preference: GamePreference) {
    const body = new PlayGameRequestBody();
    body.quizId = quizId;
    body.preference = preference;
    return responseToClass(
      GameSummary,
      await instance.post(`${this.path}/play`, instanceToPlain(body))
    );
  }
  async getGame(id: string) {
    return responseToClass(Game, await instance.get(`${this.path}/${id}`));
  }
  async putAnswer(
    gameId: string,
    questionIndex: string,
    answer: QuestionAnswer | undefined
  ) {
    const body: AnswerQuestionRequestBody = {
      answer,
    };
    return (
      await instance.put<ActionSuccessResponse>(
        `${this.path}/${gameId}/question/${questionIndex}`,
        body
      )
    ).data;
  }
  async submitAnswer(gameId: string, questionId: string) {
    return responseToClass(
      GameAnswerResult,
      await instance.post<GameAnswerResult>(
        `${this.path}/${gameId}/question/${questionId}`
      )
    );
  }
  async finishGame(gameId: string) {
    return (
      await instance.post<ActionSuccessResponse>(
        `${this.path}/${gameId}/finish`
      )
    ).data;
  }
}

export const gameApi = new GameApi();

class MediaApi {
  path = "/media";

  async upload(id: string, file: Blob) {
    const rootPath = `${this.path}/quiz/${id}`;
    const formData = new FormData();
    formData.append("file", file);
    return (
      await instance.post<UploadMediaResponse>(rootPath, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }
}

export const mediaApi = new MediaApi();
