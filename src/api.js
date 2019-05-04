import axios from 'axios'

export function getSoal(id) {
  return axios.get(`http://localhost:3000/api/soal/${id}`)
}

export function checkJawaban(id, jawaban) {
  return axios.post(`http://localhost:3000/api/jawab/${id}`, {
    jawaban: jawaban
  });
}