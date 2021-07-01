<template>
  <div>
    <soal
      ref="soalView"
      class="h-full"
      v-if="soal"
      :soal="soal"
      @submit="soalSubmit"
    ></soal>
    <div
      class="py-2 px-4 mt-4"
      :class="{
        'bg-green-500': telahDijawab && jawabanBenar,
        'bg-red-500': telahDijawab && !jawabanBenar
      }"
    >
      <p class="text-white" v-show="telahDijawab">
        <font-awesome :icon="jawabanBenar ? 'check' : 'times'"></font-awesome>
        Jawaban anda {{ jawabanBenar ? "benar" : "salah" }}
      </p>
    </div>
  </div>
</template>

<script>
import Soal from "../components/Soal.vue";
import { Soal as SoalApi } from "@/api.js";

export default {
  components: {
    Soal
  },
  props: ["soal_id"],
  data() {
    return {
      soal: undefined,
      telahDijawab: false,
      jawabanBenar: false
    };
  },
  mounted() {
    this.updateSoal();
  },
  watch: {
    soal_id() {
      this.updateSoal();
    }
  },
  methods: {
    updateSoal() {
      this.telahDijawab = false;
      this.jawabanBenar = false;
      if (this.$refs.soalView) this.$refs.soalView.pilihanTerpilih = -1;
      SoalApi.getSoal(this.$attrs.paket_id, this.soal_id).then(val => {
        this.soal = val;
      });
    },
    soalSubmit(th) {
      SoalApi.postJawaban(
        this.$attrs.paket_id,
        this.soal_id,
        th.pilihanTerpilih
      ).then(val => {
        this.jawabanBenar = val.benar;
        this.telahDijawab = true;
      });
    }
  }
};
</script>

<style>
</style>
