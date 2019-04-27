import axios from 'axios'

export function getSoal(id) {
  return axios.get(`http://localhost:3000/api/soal/${id}`)
}