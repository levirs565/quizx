<template>
  <div class="container">
    <quiz-summary :quiz="quiz">
      <c-button
        v-if="$store.state.core.user"
        type="primary"
        @click="showPlayDialog"
        >Play</c-button
      >
      <router-link
        v-if="
          $store.state.core.user && $store.state.core.user.id == quiz.userId
        "
        :to="`/quiz/${quiz_id}/edit`"
        v-slot="{ navigate, href }"
      >
        <c-button :href="href" @click="navigate">Edit</c-button>
      </router-link>
    </quiz-summary>

    <p class="page-title2">Questions</p>

    <ul>
      <li v-for="(question, index) in quiz.questions" :key="question.id">
        <question
          class="my-2"
          :index="index"
          :question="question"
          v-slot="{ component }"
        >
          <c-button
            @click="checkAnswer(component)"
            v-if="component.answer != -1"
            type="primary"
            >Check Answer</c-button
          >
          <answer-result :result="component.extraData.result"></answer-result>
        </question>
      </li>
    </ul>
  </div>
</template>

<script>
import Question from "../components/Question";
import { Quiz, Game } from "@/api.js";
import showModal from "@/content/modal/bus";
import QuizSummary from "../components/QuizSummary.vue";
import DialogPlayQuiz from "../components/DialogPlayQuiz.vue";
import AnswerResult from "../components/AnswerResult.vue";

export default {
  components: {
    Question,
    QuizSummary,
    AnswerResult,
  },
  props: {
    quiz_id: String,
  },
  data() {
    return {
      quiz: {
        id: undefined,
        title: "undefined",
        questions: [],
      },
    };
  },
  mounted() {
    this.updateQuiz();
  },
  watch: {
    quiz_id() {
      this.updateQuiz();
    },
  },
  methods: {
    updateQuiz() {
      Quiz.getQuiz(this.quiz_id).then((val) => {
        this.quiz = val;
      });
    },
    checkAnswer(questionComponent) {
      const id = questionComponent.question.id;
      const answer = questionComponent.answer;
      Quiz.checkQuestionAnswer(this.quiz_id, id, answer).then((val) => {
        this.$set(questionComponent.extraData, "result", val);
      });
    },
    showPlayDialog() {
      showModal(DialogPlayQuiz, {}, this.playGame);
    },
    playGame(interactive) {
      Game.playGame(this.quiz.id, interactive).then((game) => {
        this.$router.push(`/game/${game.id}/board`);
      });
    },
  },
};
</script>

<style></style>
