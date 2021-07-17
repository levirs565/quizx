const GameService = require('../services/game');

exports.startPermainan = (req, res, next) => {
  const { soalId, interaktif } = req.body;

  GameService.startGame(req.session, soalId, interaktif)
    .then(permainan => res.json({ msg: 'permainan started' }))
    .catch(next);
};

exports.getAllQuiz = (req, res, next) => {
  GameService.getAllQuiz(req.session)
    .then(soal => res.json(soal))
    .catch(next);
};

exports.getSoal = (req, res, next) => {
  const { id } = req.params;

  GameService.getQuiz(req.session, id)
    .then(soal => res.json(soal))
    .catch(next);
};

exports.putJawaban = (req, res, next) => {
  const { id } = req.params;
  const { jawaban } = req.body;

  GameService.putAnswer(req.session, id, jawaban)
    .then(result => res.json({ ...result, msg: 'jawaban is saved' }))
    .catch(next);
};

exports.stopPermainan = (req, res, next) => {
  GameService.stopGame(req.session)
    .then((result) => res.json(result))
    .catch(next);
};

exports.state = (req, res, next) => {
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
