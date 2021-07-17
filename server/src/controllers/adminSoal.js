const QuizAdminService = require('../services/quiz_admin');

exports.getPaketList = (req, res, next) =>
  QuizAdminService.getPackageShortDetailList(req.session)
    .then(list => res.json({ list }))
    .catch(next);

exports.newPaket = (req, res, next) =>
  QuizAdminService.newPackage(req.session, req.body)
    .then(val => res.json(val))
    .catch(next);

exports.getPaket = (req, res, next) => {
  const { id } = req.params;

  QuizAdminService.getPackage(req.session, id)
    .then(val => res.json(val))
    .catch(next);
};

exports.editPaket = (req, res, next) => {
  const { id } = req.params;

  QuizAdminService.editPackage(req.session, id, req.body)
    .then(val => res.json(val))
    .catch(next);
};

exports.removePaket = (req, res, next) => {
  const { id } = req.params;

  QuizAdminService.removePackage(req.session, id)
    .then(() => res.json({ msg: 'paket is removed' }))
    .catch(next);
};


function getQuestionIdsFromParams(params) {
  const { paketID, soalID } = params;
  return {
    paketID: parseInt(paketID),
    soalID: parseInt(soalID)
  }
}

exports.newSoal = (req, res, next) => {
  const { paketID } = getQuestionIdsFromParams(req.params);

  QuizAdminService.newQuiz(req.session, paketID, req.body)
    .then(val => res.json(val))
    .catch(next);
};

exports.getSoal = (req, res, next) => {
  const { paketID, soalID } = getQuestionIdsFromParams(req.params)

  QuizAdminService.getQuizDetail(req.session, paketID, soalID)
    .then(val => res.json(val))
    .catch(next);
};

exports.editSoal = (req, res, next) => {
  const { paketID, soalID } = getQuestionIdsFromParams(req.params)

  QuizAdminService.editQuiz(req.session, paketID, soalID, req.body)
    .then(val => res.json(val))
    .catch(next);
};

exports.removeSoal = (req, res, next) => {
  const { paketID, soalID } = getQuestionIdsFromParams(req.params)

  QuizAdminService.removeQuiz(req.session, paketID, soalID)
    .then(val => res.json({ msg: 'soal is removed' }))
    .catch(next);
};
