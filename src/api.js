import axios from 'axios';

function throwError(res) {
  let data = res.data;

  if (data.error) {
    throw data.error;
  } else {
    return data;
  }
}

const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
});

class SoalImpl {
  getPaketList() {
    return instance.get('/soal').then(throwError);
  }

  getPaket(id) {
    return instance.get(`/soal/${id}`).then(throwError);
  }

  getSoal(colId, soalId) {
    return instance.get(`/soal/${colId}/${soalId}`).then(throwError);
  }

  postJawaban(colId, soalId, jawaban) {
    return instance
      .post(`/soal/${colId}/${soalId}`, { jawaban })
      .then(throwError);
  }
}

export const Soal = new SoalImpl();

export const User = {
  signup(id, name, password) {
    return instance
      .post('/user/signup', { id, name, password })
      .then(throwError);
  },
  login(id, password) {
    return instance.post('/user/login', { id, password }).then(throwError);
  },
  logout() {
    return instance.post('/user/logout').then(throwError);
  },
  state() {
    return instance.get('/user/state').then(throwError);
  }
};
