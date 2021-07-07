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
  startPermainan(paketSoalID, interaktif) {
    return instance
      .post('/permainan/start', { soalId: paketSoalID, interaktif })
      .then(throwError);
  },
  getAllQuiz(index) {
    return instance.get(`/permainan/soal/`).then(throwError);
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

export const AdminSoal = {
  baseURL: '/admin/soal/',
  getPaketList() {
    return instance.get(this.baseURL).then(throwError);
  },
  newPaket(data) {
    return instance.post(this.baseURL, data).then(throwError);
  },
  getPaket(id) {
    return instance.get(this.baseURL + id).then(throwError);
  },
  editPaket(id, data) {
    return instance.put(this.baseURL + id, data).then(throwError);
  },
  removePaket(id) {
    return instance.delete(this.baseURL + id).then(throwError);
  },
  newSoal(paketID, data) {
    return instance.post(this.baseURL + paketID, data).then(throwError);
  },
  getSoal(paketID, soalID) {
    return instance.get(this.baseURL + paketID + '/' + soalID).then(throwError);
  },
  editSoal(paketID, soalID, data) {
    return instance
      .put(this.baseURL + paketID + '/' + soalID, data)
      .then(throwError);
  },
  removeSoal(paketID, soalID) {
    return instance
      .delete(this.baseURL + paketID + '/' + soalID)
      .then(throwError);
  }
};
