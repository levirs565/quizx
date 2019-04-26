const express = require('express');
const app = express();

// Api untuk mengetes jika server telah siap
app.get("/api/test", function (req, res) {
  res.json({
    sukses: true,
    msg: "Server telah siap"
  })
})

app.listen(3000, () => {
  console.log("SoalKU Back End serve ready on port 3000")
})
