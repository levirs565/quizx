<template>
  <div id="app">
    <!-- <soal :soal="soal.soal" :pilihan="soal.pilihan" :soalId="soal._id" @submit="soalSubmit"></soal>
    <br>
    <button @click="soalLain(-1)" style="float: left;" :disabled="soal._id <= 0">Soal Sebelumnya</button>
    <button @click="soalLain(1)" style="float: right;">Soal Selanjutnya</button>-->
    <router-view class="router-view"></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Soal from "./components/Soal.vue";
import { getSoal, checkJawaban } from "./api.js";

export default {
  name: "app",
  components: {
    HelloWorld,
    Soal
  },
  data() {
    return {
      soal: {
        _id: 0,
        soal: "",
        pilihan: []
      }
    };
  },
  methods: {
    gantiSoal(id) {
      getSoal(id).then(
        val => {
          this.$set(this, "soal", Object(val.data.soal));
        },
        err => {
          console.log(err);
        }
      );
    },
    soalLain(inc) {
      let id = this.soal._id + inc;
      if (id >= 0) {
        this.gantiSoal(id);
      }
    },
    soalSubmit(th) {
      checkJawaban(th.soalId, th.pilihanTerpilih).then(val => {
        let benar = val.data.benar;
        alert(`Jawaban anda ${benar ? "Benar" : "Salah"}`);
      });
    }
  },
  mounted() {
    this.gantiSoal(0);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0 0.5rem;
}

button, input[type=button] {
  background-color: darkgreen;
  border: none;
  padding: 10px 50px;
  font-size: 16px;
  color: white;
}
button:hover, input[type=button]:hover {
  background-color: green;
}

button:active, input[type=button]:active {
  background-color: lightgreen;
}

button:disabled, input[type=button]:disabled {
  background-color: olive;
}

button.small {
  padding: 10px 20px;
}

button.selected {
  background-color: olivedrab;
}
</style>
