<template>
  <form class="box form" action="none" @submit.prevent="start">
    <h1 class="title">Konfigurasi Permainan</h1>
    <hr class="hr">
    <label>ID Paket Soal</label>
    <input type="number" class="input w-full mb-8" v-model="paketSoalId">

    <input class="button primary" type="submit" value="Mulai Permainan" :disabled="!valid">
  </form>
</template>

<script>
import { Permainan } from "../api";

export default {
  data() {
    return {
      paketSoalId: 0
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
      Permainan.startPermainan(this.paketSoalId).then(() => {
        this.goToBoard();
      });
    },
    goToBoard() {
      this.$router.push("/permainan/board");
    }
  },
  beforeCreate() {
    if (this.$store.state.loggedIn) {
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
