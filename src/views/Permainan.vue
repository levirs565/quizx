<template>
  <div class="permainan">
    <button v-if="!onPermainan" @click="start()">Mulai Permainan</button>
    <button v-else @click="stop()">Hentikan Permainan</button>
    <br/>
    <br/>
    <jumper v-if="onPermainan" :total="soalCount" :value="1" v-model="currentSoalId">
    </jumper>
    <soal
      v-if="currentSoal != undefined"
      :soal="currentSoal"
      teksSubmit="Kirim Jawaban"
      @submit="soalSubmit"
      @change="soalChange"
      class="soal"
    ></soal>
    <p style="color: red;" v-text="lastErr" v-show="lastErr !== undefined"></p>
    <permainan-result v-if="result !== undefined" :results="result">
    </permainan-result>
  </div>
</template>

<script>
import { startPermainan, stopPermainan, getSoalPermainan, postJawabanPermainan, getPermainanResults } from "../api.js";
import Soal from "../components/Soal.vue";
import PermainanResult from '../components/PermainanResult.vue'
import Jumper from '../components/Jumper.vue'

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
      startPermainan().then(() => {
        this.onPermainan = true;
        this.lastErr = undefined;
        this.currentSoalId = 1;
        this.updateResult();
      }).catch(err => {
        this.lastErr = err;
      });
    },
    stop() {
      stopPermainan().then(res => {
        this.onPermainan = false;
        this.lastErr = undefined;
        this.currentSoalId = 0;
        this.updateResult();
        this.currentSoal = undefined;
      }).catch(err => {
        this.lastErr = err;
      });
    },
    soalSubmit(co) {
      let jawaban = co.pilihanTerpilih; 
      let id = co.soal.id;
      postJawabanPermainan(id, jawaban).then(() => {
        if (this.currentSoalId < 40) {
          this.currentSoalId++;
        }
      }).catch(err => {
        this.lastErr = err;
      });
    },
    soalChange(soal) {
      this.$nextTick(function () {
        soal.pilihanTerpilih = -1;
      })
    },
    updateResult() {
      if (this.onPermainan) {
        this.result = undefined;
      } else {
        getPermainanResults().then(data => {
          this.result = data.results;
          this.lastErr = undefined;
        }).catch(err => {
          this.lastErr = err;
        })
      }
    }
  },
  watch: {
    onPermainan() {
      if (this.onPermainan) {
        this.$nextTick(function () {
        });
      }
    },
    currentSoalId() {
      if (this.onPermainan) {
        getSoalPermainan(this.currentSoalId - 1).then(data => {
          this.currentSoal = data.soal;
          this.lastErr = undefined;
        }).catch(err => {
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
  padding: 2.5% 15%;
}

.soal > input[type=button] {
  float: right;
}
</style>
