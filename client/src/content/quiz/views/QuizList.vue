<template>
  <div class="box container">
    <h1 class="title">Koleksi Soal</h1>
    <hr class="hr" />
    <ul>
      <router-link
        v-for="quiz in quizList"
        :key="quiz.id"
        tag="li"
        :to="`/soal/${quiz.id}`"
        class="list-item"
      >
        <p class="text" v-text="quiz.name"></p>
        <p class="subtext">{{ quiz.soalCount }} Soal</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Soal } from "@/api.js";

export default {
  data() {
    return {
      quizList: []
    };
  },

  mounted() {
    Soal.getPaketList().then(val => {
      this.quizList = val.list;
    });
  }
};
</script>

<style>
</style>
