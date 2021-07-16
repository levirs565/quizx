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

export const Soal = {
  async getPaketList() {
    const res = await instance.get('/soal');
    return throwError(res);
  },
  async getPaket(id) {
    const res = await instance.get(`/soal/${id}`);
    return throwError(res);
  },
  async getSoal(colId, soalId) {
    const res = await instance.get(`/soal/${colId}/${soalId}`);
    return throwError(res);
  },
  async postJawaban(colId, soalId, jawaban) {
    const res = await instance.post(`/soal/${colId}/${soalId}`, { jawaban });
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

export const Permainan = {
  async startPermainan(paketSoalID, interaktif) {
    const res = await instance.post('/permainan/start', {
      soalId: paketSoalID,
      interaktif,
    });
    return throwError(res);
  },
  async getAllQuiz(index) {
    const res = await instance.get(`/permainan/soal/`);
    return throwError(res);
  },
  async getSoal(index) {
    const res = await instance.get(`/permainan/soal/${index}`);
    return throwError(res);
  },
  async putJawaban(index, jawaban) {
    const res = await instance.put(`/permainan/soal/${index}`, { jawaban });
    return throwError(res);
  },
  async stopPermainan() {
    const res = await instance.post('/permainan/stop');
    return throwError(res);
  },
  async state() {
    const res = await instance.get('/permainan/state');
    return throwError(res);
  },
};

export const AdminSoal = {
  baseURL: '/admin/soal/',
  async getPaketList() {
    const res = await instance.get(this.baseURL);
    return throwError(res);
  },
  async newPaket(data) {
    const res = await instance.post(this.baseURL, data);
    return throwError(res);
  },
  async getPaket(id) {
    const res = await instance.get(this.baseURL + id);
    return throwError(res);
  },
  async editPaket(id, data) {
    const res = await instance.put(this.baseURL + id, data);
    return throwError(res);
  },
  async removePaket(id) {
    const res = await instance.delete(this.baseURL + id);
    return throwError(res);
  },
  async newSoal(paketID, data) {
    const res = await instance.post(this.baseURL + paketID, data);
    return throwError(res);
  },
  async getSoal(paketID, soalID) {
    const res = await instance.get(this.baseURL + paketID + '/' + soalID);
    return throwError(res);
  },
  async editSoal(paketID, soalID, data) {
    const res = await instance.put(this.baseURL + paketID + '/' + soalID, data);
    return throwError(res);
  },
  async removeSoal(paketID, soalID) {
    const res = await instance.delete(this.baseURL + paketID + '/' + soalID);
    return throwError(res);
  },
};
