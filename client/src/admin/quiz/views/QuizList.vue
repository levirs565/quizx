<template>
  <div class="flex flex-col">
    <h1 class="title">Pengelola Soal</h1>
    <hr class="hr">
    <div class="box container list">
      <div class="list-toolbox list-item">
        <button class="button primary" @click="showNewQuiz">Paket Baru</button>
      </div>
      <ul>
        <router-link
          v-for="quiz in quizList"
          :key="quiz.id"
          class="list-item"
          :to="`/admin/soal/${quiz.id}`"
          tag="li"
        >
          <p class="text" v-text="quiz.name"></p>
          <p class="subtext">{{ quiz.soalCount }} Soal</p>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { QuizAdmin } from "@/api";
import ModalNewQuiz from "../components/ModalNewQuiz";
import showModal from "@/admin/modal/bus";

export default {
  data() {
    return {
      quizList: []
    };
  },
  methods: {
    refresh() {
      QuizAdmin.getQuizList().then(data => {
        this.quizList = data.list;
      });
    },
    showNewQuiz() {
      showModal(ModalNewQuiz, {}, this.createQuiz);
    },
    createQuiz(name) {
      QuizAdmin.createQuiz({ name }).then(this.refresh);
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>

<style src="../styles/list.css" scoped>
</style>
