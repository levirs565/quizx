<template>
  <div class="soal-views">
    <soal v-if="soal" :soal="soal.soal" :pilihan="soal.pilihan" :soalId="soalId"></soal>
    <p v-else v-text="errorTerakhir"></p>
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
      soal: undefined,
      errorTerakhir: undefined
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
        let error = val.data.err ? val.data.msg : undefined;
        this.$set(this, "soal", soal);
        this.$set(this, "errorTerakhir", error);
      });
    }
  }
};
</script>

<style>
</style>
