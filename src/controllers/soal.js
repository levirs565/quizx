const SoalService = require('../services/soal');
const { sendError } = require('../error');

exports.getPaketList = (req, res) =>
  SoalService.getPaketList()
    .then(list => res.json({ list }))
    .catch(sendError(res));

exports.getPaket = (req, res) => {
  const { id } = req.params;

  SoalService.getPaket(id)
    .then(val => {
      res.json({
        ...val
      });
    })
    .catch(sendError(res));
};

exports.getSoal = (req, res) => {
  const { colId, soalId } = req.params;

  SoalService.getSoal(colId, soalId)
    .then(val => {
      res.json({
        ...val
      });
    })
    .catch(sendError(res));
};

exports.jawabSoal = (req, res) => {
  const { colId, soalId } = req.params;
  const { jawaban } = req.body;

  SoalService.jawabSoal(colId, soalId, jawaban)
    .then(val => {
      res.json({
        benar: val
      });
    })
    .catch(sendError(res));
};
