<template>
  <div class="soal-views">
    <soal :soal="soal.soal" :pilihan="soal.pilihan" :soalId="soalId"></soal>
  </div>
</template>

<script>
import Soal from "../components/Soal.vue";
import { getSoal } from "../api";

export default {
  components: {
    Soal
  },
  props: ["soal_id"],
  data() {
    return {
      soal: {
        soal: "",
        pilihan: []
      }
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
      getSoal(this.soalId).then(val => {
        let soal = val.data.soal;
        this.$set(this, "soal", soal);
      });
    }
  }
};
</script>

<style>
</style>
