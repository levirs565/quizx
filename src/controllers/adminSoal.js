const SoalAdminService = require('../services/adminSoal');
const { sendError } = require('../error');

exports.getPaketList = (req, res) =>
  SoalAdminService.getPaketList(req.session)
    .then(list => res.json({ list }))
    .catch(sendError(res));

exports.newPaket = (req, res) =>
  SoalAdminService.newPaket(req.session, req.body)
    .then(val => res.json(val))
    .catch(sendError(res));

exports.getPaket = (req, res) => {
  const { id } = req.params;

  SoalAdminService.getPaket(req.session, id)
    .then(val => res.json(val))
    .catch(sendError(res));
};

exports.editPaket = (req, res) => {
  const { id } = req.params;

  SoalAdminService.editPaket(req.session, id, req.body)
    .then(val => res.json(val))
    .catch(sendError(res));
};

exports.removePaket = (req, res) => {
  const { id } = req.params;

  SoalAdminService.removePaket(req.session, id)
    .then(() => res.json({ msg: 'paket is removed' }))
    .catch(sendError(res));
};

exports.newSoal = (req, res) => {
  const { paketID } = req.params;

  SoalAdminService.newSoal(req.session, paketID, req.body)
    .then(val => res.json(val))
    .catch(sendError(res));
};

exports.getSoal = (req, res) => {
  const { paketID, soalID } = req.params;

  SoalAdminService.getSoal(req.session, paketID, soalID)
    .then(val => res.json(val))
    .catch(sendError(res));
};

exports.editSoal = (req, res) => {
  const { paketID, soalID } = req.params;

  SoalAdminService.editSoal(req.session, paketID, soalID, req.body)
    .then(val => res.json(val))
    .catch(sendError(res));
};

exports.removeSoal = (req, res) => {
  const { paketID, soalID } = req.params;

  SoalAdminService.removeSoal(req.session, paketID, soalID)
    .then(val => res.json({ msg: 'soal is removed' }))
    .catch(sendError(res));
};
