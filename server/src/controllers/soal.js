const SoalService = require('../services/quiz');
const { sendError } = require('../error');

exports.getPaketList = (req, res) =>
  SoalService.getPackageShortDetailList()
    .then(list => res.json({ list }))
    .catch(sendError(res));

exports.getPaket = (req, res) => {
  const { id } = req.params;

  SoalService.getPackageShortDetail(id)
    .then(val => {
      res.json({
        ...val
      });
    })
    .catch(sendError(res));
};

exports.getSoal = (req, res) => {
  const { colId, soalId } = req.params;

  SoalService.getQuizShortDetail(colId, soalId)
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

  SoalService.answerQuiz(colId, soalId, jawaban)
    .then(val => {
      res.json({
        benar: val
      });
    })
    .catch(sendError(res));
};
