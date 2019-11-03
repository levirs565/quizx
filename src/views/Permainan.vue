<template>
  <div
    class="flex m-auto w-full p-4"
    :class="{
    'flex-col': !onPermainan,
    'flex-row': onPermainan
  }"
  >
    <permainan-result :results="result" v-if="result !== undefined"></permainan-result>
    <button
      v-if="!onPermainan"
      @click="start()"
      class="button primary mx-auto"
    >{{ result ? "Mulai Lagi" : "Mulai Permainan"}}</button>

    <div v-if="onPermainan" class="w-1/5">
      <button @click="stop()" class="button danger w-full mb-2">Hentikan Permainan</button>
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
      result: undefined
    };
  },
  methods: {
    start() {
      startPermainan()
        .then(() => {
          this.onPermainan = true;
          this.currentSoalId = 1;
          this.updateResult();
        });
    },
    stop() {
      stopPermainan()
        .then(res => {
          this.onPermainan = false;
          this.currentSoalId = 0;
          this.updateResult();
          this.currentSoal = undefined;
        });
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
          });
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
        });
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
          });
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
