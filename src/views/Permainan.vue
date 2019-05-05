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
      class="soal"
    ></soal>
  </div>
</template>

<script>
import { startPermainan, stopPermainan, getSoalPermainan } from "../api.js";
import Soal from "../components/Soal.vue";

export default {
  components: {
    Soal
  },
  data() {
    return {
      onPermainan: false,
      soalCount: 40,
      lastSelectedElement: undefined,
      currentSoal: undefined
    };
  },
  methods: {
    start() {
      startPermainan().then(res => {
        let val = res.data;
        console.log(val);
        if (!val.err) {
          this.onPermainan = true;
        } else {
          console.log(val.msg);
        }
      });
    },
    stop() {
      stopPermainan().then(res => {
        let val = res.data;
        console.log(val);
        if (!val.err) {
          this.onPermainan = false;
        } else {
          console.log(val.msg);
        }
        this.currentSoal = undefined;
      });
    },
    goToSoal(id) {
      getSoalPermainan(id).then(res => {
        let data = res.data;

        if (data.err) {
          console.log(data.msg);
        } else {
          this.currentSoal = data.soal;
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
