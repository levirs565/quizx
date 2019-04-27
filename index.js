const express = require('express');
const databases = require('./src/database');
const cors = require("cors");
const app = express();

app.use(cors())

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
      soal: val
    })
  }, (err) => {
    res.json({
      err: true,
      msg: err.toString(),
      soal: null
    })
  })
})

app.listen(3000, () => {
  console.log("SoalKU Back End serve ready on port 3000")
})
