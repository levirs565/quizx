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
        data => {
          let soal = data.soal;
          this.$set(this, "soal", soal);
        },
        err => {
          this.$set(this, "soal", undefined);
          this.$set(this, "errorTerakhir", err.toString());
        }
      );
    },
    soalSubmit(th) {
      checkJawaban(this.soalId, th.pilihanTerpilih).then(data => {
        this.jawabanBenar = data.benar;
        this.telahDijawab = true;
      });
    }
  }
};
</script>

<style>
</style>
