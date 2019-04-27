<template>
  <div id="app">
    <soal :soal="soal.soal" :pilihan="soal.pilihan" :soalId="soal._id"></soal>
    <button @click="soalLain(-1)">Soal Sebelumnya</button>
    <button @click="soalLain(1)">Soal Selanjutnya</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Soal from "./components/Soal.vue";
import { getSoal } from "./api.js";

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
    wedus(th) {
      console.log(th.pilihanTerpilih);
      console.log(th.pilihan);
    },
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
  padding: 0 20%;
}
</style>
