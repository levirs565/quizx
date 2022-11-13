<template>
  <resource-wrapper :state="state" @reload="updateQuiz">
    <template v-slot:toolbar>
      <v-toolbar-title>Quiz</v-toolbar-title>
    </template>
    <template #toolbarAppend>
      <v-btn
        v-if="user && user.id == quiz.userId"
        icon
        :to="`/quiz/${quiz_id}/edit`"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <quiz-summary :quiz="quiz">
      <v-card-actions>
        <v-dialog v-model="isPlayDialogShow" v-if="user" max-width="400px">
          <template v-slot:activator="{ props }">
            <v-btn variant="text" color="primary" v-bind="props"> Play </v-btn>
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
import Question from "@/components/question/Question.vue";
import { quizApi, gameApi } from "@/api";
import QuizSummary from "@/components/quiz/QuizSummary.vue";
import DialogPlayQuiz from "@/dialog/DialogPlayQuiz.vue";
import { isAnswerEmpty as isAnswerEmptyImpl } from "@/utils";
import ResourceWrapper, {
  updateResourceStateByPromise,
} from "@/components/resource/ResourceWrapper.vue";
import useAuthStore from "@/store/auth";
import { mapState } from "pinia";

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
        quizApi.getQuiz(this.quiz_id).then((quiz) => {
          this.quiz = quiz;
        }),
        (val) => {
          this.state = val;
        }
      );
    },
    checkAnswer(questionId, answer) {
      quizApi.checkQuestionAnswer(this.quiz_id, questionId, answer).then((val) => {
        let state = 1;
        if (val.correct) state = 0;
        this.answerResults[questionId] = state;
      });
    },
    showPlayDialog() {
      this.isPlayDialogShow = true;
    },
    playGame(preference) {
      gameApi.playGame(this.quiz.id, preference).then((game) => {
        this.$router.push(`/game/${game.id}/board`);
      });
    },
    isAnswerEmpty(answer) {
      return isAnswerEmptyImpl(answer);
    },
  },
  computed: {
    ...mapState(useAuthStore, ["user"]),
  },
};
</script>

<style></style>
