<template>
  <form class="box form" action="none" @submit.prevent="start">
    <h1 class="title">Konfigurasi Permainan</h1>
    <hr class="hr" />

    <div class="field">
      <label>ID Paket Soal</label>
      <input type="number" class="input w-full" v-model="paketSoalId" />
    </div>

    <div class="field">
      <input type="checkbox" class="mr-2" v-model="interaktif" />
      <label>Interaktif</label>
    </div>

    <input
      class="button primary"
      type="submit"
      value="Mulai Permainan"
      :disabled="!valid"
    />
  </form>
</template>

<script>
import { Permainan } from "@/api";

export default {
  data() {
    return {
      paketSoalId: 0,
      interaktif: false
    };
  },
  computed: {
    valid() {
      return !isNaN(this.paketSoalId);
    }
  },
  methods: {
    updateConfig() {
      if (!isNaN(this.$route.query.id))
        this.paketSoalId = Number(this.$route.query.id);
    },
    start() {
      Permainan.startPermainan(this.paketSoalId, this.interaktif).then(() => {
        this.goToBoard();
      });
    },
    goToBoard() {
      this.$router.push("/permainan/board");
    }
  },
  beforeCreate() {
    if (this.$store.state.core.user) {
      Permainan.state().then(state => {
        if (state.permainanStarted) {
          this.goToBoard();
        }
      });
    }
  },
  mounted() {
    this.updateConfig();
  },
  watch: {
    $route() {
      this.updateConfig();
    }
  }
};
</script>

<style>
</style>
