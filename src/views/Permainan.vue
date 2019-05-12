<template>
  <div class="permainan columns is-multiline is-centered center-margin is-marginless">
    <template v-if="result !== undefined">
      <permainan-result :results="result" class="center-margin"></permainan-result>
      <div class="linebreak"></div>
    </template>
    <button
      v-if="!onPermainan"
      @click="start()"
      class="button is-primary"
    >{{ result ? "Mulai Lagi" : "Mulai Permainan"}}</button>
    <div
      class="column is-one-third columns is-multiline"
      style="flex-direction: column;padding-bottom: 0"
      v-if="onPermainan"
    >
      <button
        @click="stop()"
        class="button is-danger column is-full is-inline-flex"
        style="align-self: flex-start; margin-left: 0.75rem; margin-right: 0.75rem; width: calc(100% - 1.5rem);"
      >Hentikan Permainan</button>
      <jumper
        class="column is-full is-marginless"
        :total="soalCount"
        :value="1"
        v-model="currentSoalId"
      ></jumper>
    </div>
    <soal
      v-if="currentSoal != undefined"
      :soal="currentSoal"
      teksSubmit="Kirim Jawaban"
      @submit="soalSubmit"
      @change="soalChange"
      class="column"
      style="margin-left: 0; margin-right: 0;"
    ></soal>
    <p style="color: red;" v-text="lastErr" v-show="lastErr !== undefined"></p>
  </div>
</template>

<script>
import {
  startPermainan,
  stopPermainan,
  getSoalPermainan,
  postJawabanPermainan,
  getPermainanResults
} from "../api.js";
import Soal from "../components/Soal.vue";
import PermainanResult from "../components/PermainanResult.vue";
import Jumper from "../components/Jumper.vue";

export default {
  components: {
    Soal,
    PermainanResult,
    Jumper
  },
  data() {
    return {
      onPermainan: false,
      soalCount: 40,
      currentSoal: undefined,
      currentSoalId: 0,
      lastErr: undefined,
      result: undefined
    };
  },
  methods: {
    start() {
      startPermainan()
        .then(() => {
          this.onPermainan = true;
          this.lastErr = undefined;
          this.currentSoalId = 1;
          this.updateResult();
        })
        .catch(err => {
          this.lastErr = err;
        });
    },
    stop() {
      stopPermainan()
        .then(res => {
          this.onPermainan = false;
          this.lastErr = undefined;
          this.currentSoalId = 0;
          this.updateResult();
          this.currentSoal = undefined;
        })
        .catch(err => {
          this.lastErr = err;
        });
    },
    soalSubmit(co) {
      let jawaban = co.pilihanTerpilih;
      let id = co.soal.id;
      postJawabanPermainan(id, jawaban)
        .then(() => {
          if (this.currentSoalId < 40) {
            this.currentSoalId++;
          }
        })
        .catch(err => {
          this.lastErr = err;
        });
    },
    soalChange(soal) {
      this.$nextTick(function() {
        soal.pilihanTerpilih = -1;
      });
    },
    updateResult() {
      if (this.onPermainan) {
        this.result = undefined;
      } else {
        getPermainanResults()
          .then(data => {
            this.result = data.results;
            this.lastErr = undefined;
          })
          .catch(err => {
            this.lastErr = err;
          });
      }
    }
  },
  watch: {
    onPermainan() {
      if (this.onPermainan) {
        this.$nextTick(function() {});
      }
    },
    currentSoalId() {
      if (this.onPermainan) {
        getSoalPermainan(this.currentSoalId - 1)
          .then(data => {
            this.currentSoal = data.soal;
            this.lastErr = undefined;
          })
          .catch(err => {
            this.lastErr = err;
          });
      }
    }
  }
};
</script>

<style>
.permainan {
  text-align: center;
}

.soal {
  text-align: left;
  /* padding: 2.5% 15%; */
}

.soal > input[type="button"] {
  float: right;
}

.permainan-result {
  max-width: 16em;
}
</style>
