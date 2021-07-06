const GameService = require('../services/game');
const { sendError } = require('../error');

exports.startPermainan = (req, res) => {
  const { soalId, interaktif } = req.body;

  GameService.startGame(req.session, soalId, interaktif)
    .then(permainan => res.json({ msg: 'permainan started' }))
    .catch(sendError(res));
};

exports.getSoal = (req, res) => {
  const { id } = req.params;

  GameService.getQuiz(req.session, id)
    .then(soal => res.json(soal))
    .catch(sendError(res));
};

exports.putJawaban = (req, res) => {
  const { id } = req.params;
  const { jawaban } = req.body;

  GameService.putAnswer(req.session, id, jawaban)
    .then(result => res.json({ ...result, msg: 'jawaban is saved' }))
    .catch(sendError(res));
};

exports.stopPermainan = (req, res) => {
  GameService.stopGame(req.session)
    .then((result) => res.json(result))
    .catch(sendError(res));
};

exports.state = (req, res) => {
  GameService.getUserGame(req.session).then((permainan) => {
    res.json({
      permainanStarted: permainan != null,
      permainan: permainan
        ? {
            soalPaketID: permainan.soalPaketID,
            interaktif: permainan.interaktif,
            soalCount: permainan.soalList.length,
            jawabanCount: permainan.jawabanList.reduce((acc, val) => acc + (val ? 1 : 0), 0)
          }
        : null
    });
  });
};
