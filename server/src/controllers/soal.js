const SoalService = require('../services/quiz');

exports.getPaketList = (req, res, next) =>
  SoalService.getPackageShortDetailList()
    .then(list => res.json({ list }))
    .catch(next);

exports.getPaket = (req, res, next) => {
  const { id } = req.params;

  SoalService.getPackageShortDetail(id)
    .then(val => {
      res.json({
        ...val
      });
    })
    .catch(next);
};

exports.getSoal = (req, res, next) => {
  const { colId, soalId } = req.params;

  SoalService.getQuizShortDetail(colId, soalId)
    .then(val => {
      res.json({
        ...val
      });
    })
    .catch(next);
};

exports.jawabSoal = (req, res, next) => {
  const { colId, soalId } = req.params;
  const { jawaban } = req.body;

  SoalService.answerQuiz(colId, soalId, jawaban)
    .then(val => {
      res.json(val);
    })
    .catch(next);
};
