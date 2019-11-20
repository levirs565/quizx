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
  withCredentials: true
});

export const Soal = {
  getPaketList() {
    return instance.get('/soal').then(throwError);
  },
  getPaket(id) {
    return instance.get(`/soal/${id}`).then(throwError);
  },
  getSoal(colId, soalId) {
    return instance.get(`/soal/${colId}/${soalId}`).then(throwError);
  },
  postJawaban(colId, soalId, jawaban) {
    return instance
      .post(`/soal/${colId}/${soalId}`, { jawaban })
      .then(throwError);
  }
};

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

export const Permainan = {
  startPermainan(paketSoalID) {
    return instance
      .post('/permainan/start', { soalId: paketSoalID })
      .then(throwError);
  },
  getSoal(index) {
    return instance.get(`/permainan/soal/${index}`).then(throwError);
  },
  putJawaban(index, jawaban) {
    return instance
      .put(`/permainan/soal/${index}`, { jawaban })
      .then(throwError);
  },
  stopPermainan() {
    return instance.post('/permainan/stop').then(throwError);
  },
  state() {
    return instance.get('/permainan/state').then(throwError);
  }
};
