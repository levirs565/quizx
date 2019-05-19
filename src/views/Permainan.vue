<template>
  <div class="flex flex-wrap">
    <template v-if="result !== undefined">
      <permainan-result :results="result" class="mx-auto"></permainan-result>
      <div class="w-full h-4"></div>
    </template>
    <button
      v-if="!onPermainan"
      @click="start()"
      class="button is-primary mx-auto"
    >{{ result ? "Mulai Lagi" : "Mulai Permainan"}}</button>
    <div v-if="onPermainan" class="flex flex-col w-1/5">
      <button @click="stop()" class="button is-danger rounded-none">Hentikan Permainan</button>
      <jumper :total="soalCount" :value="1" v-model="currentSoalId"></jumper>
    </div>
    <soal
      v-if="currentSoal != undefined"
      :soal="currentSoal"
      teksSubmit="Kirim Jawaban"
      @submit="soalSubmit"
      @change="soalChange"
      ref="soalView"
      class="w-4/5 pl-4"
    ></soal>
    <p v-text="lastErr" v-show="lastErr !== undefined"></p>
  </div>
</template>

<script>
import {
  startPermainan,
  stopPermainan,
  getSoalPermainan,
  postJawabanPermainan,
  getPermainanResults,
  getPermainanState
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
        .catch(this.catchError);
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
        .catch(this.catchError);
    },
    soalSubmit(co) {
      let jawaban = co.pilihanTerpilih;
      let id = co.soal.id;
      this.setLoading(true);
      postJawabanPermainan(id, jawaban)
        .then(() => {
          this.setLoading(false);
          if (this.currentSoalId < 40) {
            this.currentSoalId++;
          }
        })
        .catch(this.catchError);
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
          .catch(this.catchError);
      }
    },
    setLoading(is) {
      this.$refs.soalView.isLoading = is;
    },
    updateState() {
      getPermainanState()
        .then(data => {
          console.log(data);
          let state = data.state;
          this.onPermainan = state.onPermainan;
          this.currentSoalId = state.lastSoal + 1;
        })
        .catch(this.catchError);
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
          .catch(this.catchError);
      }
    }
  },
  beforeMount() {
    this.updateState();
  }
};
</script>

<style>
/* .permainan {
  text-align: center;
}

.soal {
  text-align: left;
  padding: 2.5% 15%;
}

.soal > .button {
  float: right;
}

.permainan-result {
  max-width: 16em;
} */
</style>
