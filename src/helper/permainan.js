const _ = require('underscore');

class Permainan {
  constructor(soals) {
    this.soals = soals;
    this.jawabans = [];
    this.isFinished = false;
  }

  getSoalCount() {
    return this.soals.length;
  }

  getSoal(id) {
    this.lastSoal = id;
    return this.soals[id];
  }

  setJawaban(id, jwb) {
    this.jawabans[id] = jwb;
  }

  finish() {
    this.results = this.calculateResults();
    this.isFinished = true;
  }

  calculateResults() {
    const resuls = {
      benar: [],
      salah: [],
      takDiJawab: []
    };

    this.soals.forEach((soal, index) => {
      const jawaban = this.jawabans[index];
      const takDiJawab = _.isNull(jawaban) || _.isUndefined(jawaban);

      if (takDiJawab) {
        resuls.takDiJawab.push(index);
        return;
      }

      const benar = soal.jawaban === jawaban;

      if (benar) {
        resuls.benar.push(index);
      } else {
        resuls.salah.push(index);
      }
    });

    return resuls;
  }
}

exports.Permainan = Permainan;
