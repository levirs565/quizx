<template>
  <div>
    <quiz-summary :quiz="quiz">
      <b-button
        v-if="$store.state.core.user"
        type="is-primary"
        @click="showPlayDialog"
        >Play</b-button
      >
      <router-link
        v-if="
          $store.state.core.user && $store.state.core.user.id == quiz.userId
        "
        :to="`/quiz/${quiz_id}/edit`"
        v-slot="{ navigate, href }"
      >
        <b-button :href="href" @click="navigate">Edit</b-button>
      </router-link>
    </quiz-summary>

    <p class="subtitle">Questions</p>

    <ul>
      <li v-for="(question, index) in quiz.questions" :key="question.id">
        <question
          class="my-2"
          :index="index"
          :question="question"
          v-slot="{ component }"
        >
          <b-button
            @click="checkAnswer(component)"
            v-if="component.answer != -1"
            type="is-primary"
            >Check Answer</b-button
          >
          <answer-result :result="component.extraData.result"></answer-result>
        </question>
      </li>
    </ul>

    <b-modal
      v-model="isPlayDialogShow"
      :destroy-on-hide="false"
      has-modal-card
      trap-focus
      :can-cancel="['escape', 'outside']"
      custom-class="dialog"
    >
      <template #default="props">
        <dialog-play-quiz
          @close="props.close"
          @play="playGame"
        ></dialog-play-quiz>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Question from "../components/Question";
import { Quiz, Game } from "@/api.js";
import QuizSummary from "../components/QuizSummary.vue";
import DialogPlayQuiz from "../components/DialogPlayQuiz.vue";
import AnswerResult from "../components/AnswerResult.vue";

export default {
  components: {
    Question,
    QuizSummary,
    AnswerResult,
    DialogPlayQuiz,
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
      isPlayDialogShow: false,
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
      Quiz.getQuiz(this.quiz_id)
        .then((val) => {
          this.quiz = val;
        })
        .catch(() => {
          this.$buefy.toast.open({
            message: "Cannot load Quiz",
            type: "is-danger",
          });
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
      this.isPlayDialogShow = true;
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
