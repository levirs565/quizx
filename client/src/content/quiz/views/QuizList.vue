<template>
  <div class="box container">
    <h1 class="title">Koleksi Soal</h1>
    <hr class="hr" />
    <ul>
      <router-link
        v-for="quiz in quizList"
        :key="quiz.id"
        tag="li"
        :to="`/quiz/${quiz.id}`"
        class="list-item"
      >
        <p class="text" v-text="quiz.name"></p>
        <p class="subtext">{{ quiz.soalCount }} Soal</p>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { Quiz } from "@/api.js";

export default {
  data() {
    return {
      quizList: []
    };
  },

  mounted() {
    Quiz.getQuizList().then(val => {
      this.quizList = val.list;
    });
  }
};
</script>

<style>
</style>
