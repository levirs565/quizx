const SoalService = require('../services/soal');
const consts = require('../consts');
const { throwNull, sendError } = require('../helper/controller');

exports.get = (req, res) => {
  const { id } = req.params;

  SoalService.get(id)
    .then(throwNull(consts.MSG_SOAL_NF))
    .then(val => {
      res.json({
        soal: val
      });
    })
    .catch(sendError(res));
};

exports.jawab = (req, res) => {
  const { id } = req.params;
  const { jawaban } = req.body;

  SoalService.jawab(id, jawaban)
    .then(throwNull)
    .then(val => {
      res.json({
        benar: val
      });
    })
    .catch(sendError(res));
};
