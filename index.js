const express = require('express');
const databases = require('./src/database');
const cors = require("cors");
const utils = require("./src/utils")
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
app.get("/api/getSoal", function (req, res) {
  utils.handleBaseRequest(databases.getSoal(req.query.id), (val, isNull, req, res) => {
    return {
      soal: isNull ? null : {
        _id: val._id,
        soal: val.soal,
        pilihan: val.pilihan
      }
    }
  }, "Soal tidak ada", req, res);
})

app.post('/api/checkJawaban', function (req, res) {
  utils.handleBaseRequest(databases.getSoal(req.body.id), (val, isNull, req, res) => {
    return {
      benar: isNull ? false : req.body.jawaban == val.jawaban
    }
  }, "Soal tidak ada", req, res);
})

app.listen(3000, () => {
  console.log("SoalKU Back End serve ready on port 3000")
})
