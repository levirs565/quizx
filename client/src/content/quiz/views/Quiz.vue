<template>
  <resource-wrapper :state="state" @reload="updateQuiz">
    <template v-slot:toolbar>
      <v-toolbar-title>Quiz</v-toolbar-title>
      <v-spacer />

      <v-btn
        v-if="
          $store.state.auth.user && $store.state.auth.user.id == quiz.userId
        "
        icon
        :to="`/quiz/${quiz_id}/edit`"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <quiz-summary :quiz="quiz">
      <v-card-actions>
        <v-dialog
          v-model="isPlayDialogShow"
          v-if="$store.state.auth.user"
          max-width="400px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="primary" v-on="on" v-bind="attrs"> Play </v-btn>
          </template>

          <dialog-play-quiz
            @close="isPlayDialogShow = false"
            @play="playGame"
          ></dialog-play-quiz>
        </v-dialog>
      </v-card-actions>
    </quiz-summary>

    <p class="text-h6 my-4">Questions</p>

    <v-row dense>
      <v-col
        cols="12"
        v-for="(question, index) in quiz.questions"
        :key="question.id"
      >
        <question
          :index="index"
          :question="question"
          v-slot="{ component }"
          :answerState="answerResults[question.id]"
        >
          <v-card-actions v-if="!isAnswerEmpty(component.answer)">
            <v-btn
              @click="checkAnswer(question.id, component.answer)"
              color="primary"
              >Check Answer
            </v-btn>
          </v-card-actions>
        </question>
      </v-col>
    </v-row>
  </resource-wrapper>
</template>

<script>
import Question from "../components/Question";
import { Quiz, Game } from "@/api";
import QuizSummary from "../components/QuizSummary.vue";
import DialogPlayQuiz from "../components/DialogPlayQuiz.vue";
import { isAnswerEmpty as isAnswerEmptyImpl } from "@/content/utils";
import ResourceWrapper, {
  updateResourceStateByPromise,
} from "@/components/ResourceWrapper.vue";

export default {
  components: {
    Question,
    QuizSummary,
    DialogPlayQuiz,
    ResourceWrapper,
  },
  props: {
    quiz_id: String,
  },
  data() {
    return {
      quiz: {},
      isPlayDialogShow: false,
      state: null,
      answerResults: {},
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
      updateResourceStateByPromise(
        Quiz.getQuiz(this.quiz_id).then((quiz) => {
          this.quiz = quiz;
        }),
        (val) => {
          this.state = val;
        }
      );
    },
    checkAnswer(questionId, answer) {
      Quiz.checkQuestionAnswer(this.quiz_id, questionId, answer).then((val) => {
        let state = 1;
        if (val.correct) state = 0;
        this.$set(this.answerResults, questionId, state);
      });
    },
    showPlayDialog() {
      this.isPlayDialogShow = true;
    },
    playGame(preference) {
      Game.playGame(this.quiz.id, preference).then((game) => {
        this.$router.push(`/game/${game.id}/board`);
      });
    },
    isAnswerEmpty(answer) {
      return isAnswerEmptyImpl(answer);
    },
  },
};
</script>

<style></style>
