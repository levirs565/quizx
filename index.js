const express = require('express');
const databases = require('./src/database');
const cors = require("cors");
const app = express();

app.use(cors())
app.use(express.json());

// Api untuk mengetes jika server telah siap
app.get("/api/test", function (req, res) {
  res.json({
    sukses: true,
    msg: "Server telah siap"
  })
});

// Api untuk mendapatkan soal
app.get("/api/soal/:id", function (req, res) {
  databases.getSoal(req.params.id).then((val) => {
    let isNull = val == void 0;
    res.json({
      err: isNull,
      msg: isNull ? "Soal tidak ada" : null,
      soal: isNull ? null : {
        _id: val._id,
        soal: val.soal,
        pilihan: val.pilihan
      }
    })
  }, (err) => {
    res.json({
      err: true,
      msg: err.toString(),
      soal: null
    })
  })
})

app.post('/api/checkJawaban', function (req, res) {
  let id = req.body.id;
  let jawaban = req.body.jawaban;

  databases.getSoal(id).then((val) => {
    let isNull = val == void 0;
    res.json({
      benar: isNull ? false : jawaban == val.jawaban,
      err: isNull,
      msg: isNull ? "Soal tidak ada" : null
    })
  }, (err) => {
    res.json({
      err: true,
      msg: err.toString(),
      benar: false
    })
  })
})

app.listen(3000, () => {
  console.log("SoalKU Back End serve ready on port 3000")
})
