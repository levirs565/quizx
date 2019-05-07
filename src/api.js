import axios from 'axios';

function pm(promise) {
  return promise.then(res => {
    let data = res.data;

    if (data.err) {
      throw data.msg;
    } else {
      return data;
    }
  });
}

export function getSoal(id) {
  return pm(
    axios.get(`http://localhost:3000/api/soal/${id}`, {
      withCredentials: true
    })
  );
}

export function checkJawaban(id, jawaban) {
  return pm(
    axios.post(
      `http://localhost:3000/api/jawab/${id}`,
      {
        jawaban: jawaban
      },
      {
        withCredentials: true
      }
    )
  );
}

export function startPermainan() {
  return pm(
    axios.post(
      'http://localhost:3000/api/permainan/start',
      {},
      {
        withCredentials: true
      }
    )
  );
}

export function getSoalPermainan(id) {
  return pm(
    axios.get(`http://localhost:3000/api/permainan/soal/${id}`, {
      withCredentials: true
    })
  );
}

export function postJawabanPermainan(id, jawaban) {
  return pm(
    axios.post(
      `http://localhost:3000/api/permainan/jawab/${id}`,
      {
        jawaban: jawaban
      },
      {
        withCredentials: true
      }
    )
  );
}

export function stopPermainan() {
  return pm(
    axios.post(
      'http://localhost:3000/api/permainan/stop',
      {},
      {
        withCredentials: true
      }
    )
  );
}

export function getPermainanResults() {
  return pm(
    axios.get('http://localhost:3000/api/permainan/results', {
      withCredentials: true
    })
  );
}
