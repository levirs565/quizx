const SoalService = require('../services/soal');
const { sendError } = require('../error');

exports.getCollectionList = (req, res) =>
  SoalService.getCollectionList()
    .then(list => res.json({ list }))
    .catch(sendError(res));

exports.getCollection = (req, res) => {
  const { id } = req.params;

  SoalService.getCollection(id)
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
