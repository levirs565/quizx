<template>
  <base-game-board
    :game="game"
    :jumperButtons="jumperButtons"
    :showButtons="showButtons"
    @finish="$emit('finish')"
  >
    <transition name="fade">
      <div v-if="showQuestion">
        <v-row no-gutters>
          <p v-if="game.data.preference.retryCount">
            Retry count: {{ game.data.currentQuestionRetryCount }}. Max retry
            count:
            {{ game.data.preference.retryCount }}
          </p>
          <v-spacer />
          <p v-if="game.data.preference.questionTimeSecond">
            Time left: {{ timer.text }}
          </p>
        </v-row>
        <question
          :index="currentQuestionIndex"
          :question="currentQuestion"
          :initialAnswer="currentQuestion.answer"
          @answerChanged="$emit('answerChanged', $event)"
        />
      </div>
      <p v-else-if="currentQuestionIndex == -1">
        Game is completed. Press 'Finish' now.
      </p>
    </transition>
    <template v-slot:buttons>
      <transition name="fade">
        <p class="error--text" v-show="showTryAgain">Try again</p>
      </transition>
      <v-spacer />
      <v-btn v-if="showQuestion" class="mr-4" @click="submitCurrentAnswer"
        >Submit</v-btn
      >
    </template>
  </base-game-board>
</template>
<script>
import { CounDownTimer } from "@/utils";
import BaseGameBoard from "./BaseGameBoard.vue";
import Question from "./Question.vue";
export default {
  components: { BaseGameBoard, Question },
  props: {
    game: Object,
  },
  data() {
    return {
      currentQuestion: {},
      showQuestion: false,
      showButtons: false,
      timer: new CounDownTimer(() => {
        this.submitCurrentAnswer();
      }),
    };
  },
  methods: {
    submitCurrentAnswer() {
      this.$emit(
        "submitAnswer",
        this.currentQuestionIndex,
        this.currentQuestion.id
      );
    },
  },
  watch: {
    currentQuestionIndex: {
      immediate: true,
      handler(val) {
        this.showQuestion = false;
        if (val > -1) {
          this.showButtons = false;
          setTimeout(() => {
            this.currentQuestion = this.game.questions[val];
            this.showQuestion = true;
            this.showButtons = true;
          }, 500);
        } else {
          this.showButtons = true;
        }
      },
    },
    "game.data.currentQuestionMaxTime": {
      immediate: true,
      handler(val) {
        this.timer.start(new Date(val).getTime());
      },
    },
  },
  computed: {
    currentQuestionIndex() {
      return this.game.data.currentQuestionIndex;
    },
    jumperButtons() {
      return this.game.questions.map((val, index) => {
        const state = this.game.questionsState[index];
        if (state == 0) return "success";
        else if (state == 1) return "error";
        else if (state == 2) return "warning";
      });
    },
    showTryAgain() {
      return this.game.data.currentQuestionRetryCount > 0;
    },
  },
};
</script>
