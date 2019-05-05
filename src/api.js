import axios from 'axios';

export function getSoal(id) {
  return axios.get(`http://localhost:3000/api/soal/${id}`, {
    withCredentials: true
  });
}

export function checkJawaban(id, jawaban) {
  return axios.post(`http://localhost:3000/api/jawab/${id}`, {
    jawaban: jawaban
  }, {
    withCredentials: true
  });
}

export function startPermainan() {
  return axios.post('http://localhost:3000/api/permainan/start', {}, {
    withCredentials: true
  });
}

export function getSoalPermainan(id) {
  return axios.get(`http://localhost:3000/api/permainan/soal/${id}`, {
    withCredentials: true
  });
}

export function stopPermainan() {
  return axios.post('http://localhost:3000/api/permainan/stop', {}, {
    withCredentials: true
  });
}
