<template>
  <form class="box form" action="none" @submit.prevent="start">
    <h1 class="title">Konfigurasi Permainan</h1>
    <hr class="hr" />

    <div class="field">
      <label>ID Paket Soal</label>
      <input type="number" class="input w-full" v-model="quizId" />
    </div>

    <div class="field">
      <input type="checkbox" class="mr-2" v-model="interactive" />
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
import { Game } from "@/api";

export default {
  data() {
    return {
      quizId: 0,
      interactive: false
    };
  },
  computed: {
    valid() {
      return !isNaN(this.quizId);
    }
  },
  methods: {
    updateConfig() {
      if (!isNaN(this.$route.query.id))
        this.quizId = Number(this.$route.query.id);
    },
    start() {
      Game.playGame(this.quizId, this.interactive).then((game) => {
        this.goToBoard(game.id);
      });
    },
    goToBoard(id) {
      this.$router.push(`/permainan/${id}/board`);
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
