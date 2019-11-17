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
  getCollectionList() {
    return instance.get('/soal').then(throwError);
  }

  getCollection(id) {
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
