<template>
  <div class="container">
    <div class="box mb-8">
      <h1 class="title" v-text="quiz.name"></h1>
      <p class="subtext">{{ quiz.soalList.length }} Soal</p>
      <hr class="hr" />

      <div v-if="$store.state.core.user" class="mb-2">
        <router-link
          :to="`/permainan/config?id=${paket_id}`"
          class="button primary"
        >
          <font-awesome icon="play"></font-awesome>
          <span>Mainkan</span>
        </router-link>
      </div>
    </div>

    <ul>
      <li
        v-for="question in quiz.soalList"
        :key="question.id"
      >
        <question class="box my-4" :question="question" @submit="checkAnswer" v-slot="props">
          <button 
            v-show="props.answer > -1" 
            type="button" 
            class="button primary mt-4"
            @click="checkAnswer(props.quiz, props.answer)">
            Check Answer
          </button>
          <span v-if="answerResults[props.quiz.id]"
            class="ml-4"
            :class="answerResults[props.quiz.id].benar ? 'text-green-600' : 'text-red-600'">
            Jawaban anda {{ answerResults[props.quiz.id].benar ? "benar" : "salah coba lagi." }}
          </span>
        </question>
      </li>
    </ul>
  </div>
</template>

<script>
import Question from "../components/Question";
import { Soal as SoalApi } from "@/api.js";

export default {
  components: {
    Question
  },
  props: {
    paket_id: String
  },
  data() {
    return {
      answerResults: {},
      quiz: {
        name: "undefined",
        soalList: []
      }
    };
  },
  mounted() {
    this.updateQuiz();
  },
  watch: {
    paket_id() {
      this.updateQuiz();
    }
  },
  methods: {
    updateQuiz() {
      SoalApi.getPaket(this.paket_id).then(val => {
        this.quiz = val;
      });
    },
    checkAnswer(quiz, answer) {
      SoalApi.postJawaban(this.paket_id, quiz.id, answer).then(val => {
        this.$set(this.answerResults, quiz.id, val)
      })
    }
  }
};
</script>

<style>
</style>
