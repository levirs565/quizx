<template>
  <div class="permainan is-flex container">
    <div class="vcenter-margin center-margin" v-show="!onPermainan">
      <template v-if="result !== undefined">
        <permainan-result :results="result" class="center-margin"></permainan-result>
        <div class="linebreak"></div>
      </template>
      <button
        v-if="!onPermainan"
        @click="start()"
        class="button is-primary"
      >{{ result ? "Mulai Lagi" : "Mulai Permainan"}}</button>
    </div>
    <div class="columns is-multiline center-margin is-marginless rows" v-show="onPermainan">
      <div
        class="column is-one-third columns is-multiline not-stretch"
        style="flex-direction: column;padding-bottom: 0;"
      >
        <button
          @click="stop()"
          class="button is-danger column is-full"
          style="align-self: flex-start; margin-left: 0.75rem; margin-right: 0.75rem; width: calc(100% - 1.5rem);"
        >Hentikan Permainan</button>
        <div class="linebreak"></div>
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
        ref="soalView"
      ></soal>
    </div>
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
.permainan {
  text-align: center;
}

.soal {
  text-align: left;
  /* padding: 2.5% 15%; */
}

.soal > .button {
  float: right;
}

.permainan-result {
  max-width: 16em;
}
</style>
