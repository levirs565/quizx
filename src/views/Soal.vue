<template>
  <div class="soal-views">
    <soal
      v-if="soal"
      :soal="soal.soal"
      :pilihan="soal.pilihan"
      :soalId="soalId"
      @submit="soalSubmit"
    ></soal>
    <p v-else v-text="errorTerakhir"></p>
    <p v-if="telahDijawab">Jawaban anda {{ jawabanBenar ? 'benar' : 'salah' }}</p>
  </div>
</template>

<script>
import Soal from "../components/Soal.vue";
import { getSoal, checkJawaban } from "../api";

export default {
  components: {
    Soal
  },
  props: ["soal_id"],
  data() {
    return {
      soal: undefined,
      errorTerakhir: undefined,
      telahDijawab: false,
      jawabanBenar: false
    };
  },
  computed: {
    soalId() {
      return Number(this.soal_id);
    }
  },
  mounted() {
    this.updateSoal();
  },
  watch: {
    soalId() {
      this.updateSoal();
    }
  },
  methods: {
    updateSoal() {
      this.telahDijawab = false;
      this.jawabanBenar = false;
      getSoal(this.soalId).then(
        val => {
          let soal = val.data.soal;
          let error = val.data.err ? val.data.msg : undefined;
          this.$set(this, "soal", soal);
          this.$set(this, "errorTerakhir", error);
        },
        err => {
          this.$set(this, "soal", undefined);
          this.$set(this, "errorTerakhir", err.toString());
        }
      );
    },
    soalSubmit(th) {
      checkJawaban(this.soalId, th.pilihanTerpilih).then(val => {
        let data = val.data;
        this.jawabanBenar = data.benar;
        this.telahDijawab = true;
      });
    }
  }
};
</script>

<style>
</style>
