<template>
  <div class="permainan">
    <button v-if="!onPermainan" @click="start()">Mulai Permainan</button>
    <button v-else @click="stop()">Hentikan Permainan</button>
    <br/>
    <ul v-if="onPermainan" style="list-type: none;">
      <li style="display: inline;" v-for="index in Array(soalCount).keys()" :key="index">
        <button class="small" @click="jumpSoal" :data-soal-id="index">{{ index + 1 }}</button>
      </li>
    </ul>
    <soal
      v-if="currentSoal != undefined"
      :soal="currentSoal.soal"
      :pilihan="currentSoal.pilihan"
      :soalId="currentSoal.id"
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

export default {
  components: {
    Soal,
    PermainanResult
  },
  data() {
    return {
      onPermainan: false,
      soalCount: 40,
      lastSelectedElement: undefined,
      currentSoal: undefined,
      lastErr: undefined,
      result: undefined
    };
  },
  methods: {
    start() {
      startPermainan().then(res => {
        let val = res.data;
        if (!val.err) {
          this.onPermainan = true;
          this.lastErr = undefined;
          this.updateResult();
        } else {
          this.lastErr = val.msg;
        }
      });
    },
    stop() {
      stopPermainan().then(res => {
        let val = res.data;
        if (!val.err) {
          this.onPermainan = false;
          this.lastErr = undefined;
          this.updateResult();
        } else {
          this.lastErr = val.msg;
        }
        this.currentSoal = undefined;
      });
    },
    goToSoal(id) {
      getSoalPermainan(id).then(res => {
        let data = res.data;

        if (data.err) {
          this.lastErr = data.msg;
        } else {
          this.currentSoal = data.soal;
          this.lastErr = undefined;
        }
      });
    },
    jumpSoal(e) {
      let target = e.target;

      if (target == this.lastSelectedElement) {
        return;
      }

      target.classList.add("selected");
      if (this.lastSelectedElement !== undefined) {
        this.lastSelectedElement.classList.remove("selected");
      }
      this.lastSelectedElement = target;

      this.goToSoal(Number(target.dataset.soalId));
    },
    soalSubmit(co) {
      let jawaban = co.pilihanTerpilih; 
      let id = co.soalId;
      postJawabanPermainan(id, jawaban).then(res => {
        let data = res.data;
        if (data.err) {
          this.lastErr = data.msg;
        } else {
          this.jumpSoalID(id + 1);
        }
      });
    },
    jumpSoalID(id) {
      if (id > this.soalCount - 1) {
        return;
      }

      document.querySelector(`button.small[data-soal-id='${id}']`).click();
    },
    soalChange(soal) {
      this.$nextTick(function () {
        soal.changeJawaban(-1);
      })
    },
    updateResult() {
      if (this.onPermainan) {
        this.result = undefined;
      } else {
        getPermainanResults().then((res) => {
          let data = res.data;
          
          if (data.err) {
            this.lastErr = data.msg;
          } else {
            this.result = data.results;
            this.lastErr = undefined;
          }
        })
      }
    }
  },
  watch: {
    onPermainan() {
      if (this.onPermainan) {
        this.$nextTick(function () {
          this.jumpSoalID(0);
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
