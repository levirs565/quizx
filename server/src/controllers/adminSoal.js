const QuizAdminService = require('../services/quiz_admin');
const { sendError } = require('../error');

exports.getPaketList = (req, res) =>
  QuizAdminService.getPackageShortDetailList(req.session)
    .then(list => res.json({ list }))
    .catch(sendError(res));

exports.newPaket = (req, res) =>
  QuizAdminService.newPackage(req.session, req.body)
    .then(val => res.json(val))
    .catch(sendError(res));

exports.getPaket = (req, res) => {
  const { id } = req.params;

  QuizAdminService.getPackage(req.session, id)
    .then(val => res.json(val))
    .catch(sendError(res));
};

exports.editPaket = (req, res) => {
  const { id } = req.params;

  QuizAdminService.editPackage(req.session, id, req.body)
    .then(val => res.json(val))
    .catch(sendError(res));
};

exports.removePaket = (req, res) => {
  const { id } = req.params;

  QuizAdminService.removePackage(req.session, id)
    .then(() => res.json({ msg: 'paket is removed' }))
    .catch(sendError(res));
};

exports.newSoal = (req, res) => {
  const { paketID } = req.params;

  QuizAdminService.newQuiz(req.session, paketID, req.body)
    .then(val => res.json(val))
    .catch(sendError(res));
};

exports.getSoal = (req, res) => {
  const { paketID, soalID } = req.params;

  QuizAdminService.getQuizDetail(req.session, paketID, soalID)
    .then(val => res.json(val))
    .catch(sendError(res));
};

exports.editSoal = (req, res) => {
  const { paketID, soalID } = req.params;

  QuizAdminService.editQuiz(req.session, paketID, soalID, req.body)
    .then(val => res.json(val))
    .catch(sendError(res));
};

exports.removeSoal = (req, res) => {
  const { paketID, soalID } = req.params;

  QuizAdminService.removeQuiz(req.session, paketID, soalID)
    .then(val => res.json({ msg: 'soal is removed' }))
    .catch(sendError(res));
};
