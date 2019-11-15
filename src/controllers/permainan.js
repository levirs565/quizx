const PermainanService = require('../services/permainan');
const { sendError } = require('../utils/error');

exports.startPermainan = (req, res) => {
  const { soalId } = req.body;

  PermainanService.startPermainan(req.session, soalId)
    .then(permainan => res.json({ msg: 'permainan started' }))
    .catch(sendError(res));
};

exports.getSoal = (req, res) => {
  const { id } = req.params;

  PermainanService.getSoal(req.session, id)
    .then(soal => res.json(soal))
    .catch(sendError(res));
};

exports.putJawaban = (req, res) => {
  const { id } = req.params;
  const { jawaban } = req.body;

  PermainanService.putJawaban(req.session, id, jawaban)
    .then(permainan => res.json({ msg: 'jawaban is saved' }))
    .catch(sendError(res));
};

exports.stopPermainan = (req, res) => {
  PermainanService.stopPermainan(req.session)
    .then(([result, permainan]) => res.json(result))
    .catch(sendError(res));
};
