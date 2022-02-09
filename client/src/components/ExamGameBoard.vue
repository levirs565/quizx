<template>
  <base-game-board
    :game="game"
    :jumperButtons="jumperButtons"
    @jumperClick="goToQuestion"
    @finish="$emit('finish')"
  >
    <template v-slot:sidebar>
      <v-card-text class="text-center text--primary pb-0" v-if="timer.show">
        <span class="text-h5">{{ timer.timeLeftText }}</span>
      </v-card-text>
    </template>

    <v-row dense>
      <v-col
        cols="12"
        v-for="(question, index) in game.questions"
        :key="question.id"
      >
        <question
          :index="index"
          :question="question"
          :initialAnswer="question.answer"
          @answerChanged="putAnswer"
          ref="questions"
        >
        </question>
      </v-col>
    </v-row>
  </base-game-board>
</template>
<script>
import {
  calculateTimeLeftSecond,
  formatSecondTime,
  isAnswerEmpty,
} from "@/utils";
import BaseGameBoard from "./BaseGameBoard.vue";
import Question from "./Question.vue";
export default {
  components: { Question, BaseGameBoard },
  props: {
    game: Object,
  },
  data() {
    return {
      timer: {
        show: false,
        timeLeftText: "",
        maxTime: 0,
        interval: 0,
      },
      jumperButtons: [],
    };
  },
  methods: {
    startTimer() {
      if (this.timer.interval) {
        clearInterval(this.timer.interval);
        this.timer.interval = 0;
      }
      if (this.game.data.maxFinishTime) {
        this.timer.show = true;
        this.timer.maxTime = new Date(this.game.data.maxFinishTime).getTime();
        this.timerTick();
        this.timer.interval = setInterval(this.timerTick, 1000);
      }
    },
    timerTick() {
      const timeLeft = calculateTimeLeftSecond(this.timer.maxTime);
      if (timeLeft <= 0) {
        this.$emit("finish");
        clearInterval(this.timer.interval);
      }
      this.timer.timeLeftText = formatSecondTime(timeLeft);
    },
    getElementTop(el) {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      return el.getBoundingClientRect().top + scrollY;
    },
    goToQuestion(index) {
      const element = this.$refs.questions[index].$el;
      const top = this.getElementTop(element) - this.$vuetify.application.top;
      window.scrollTo(0, top);
    },
    putAnswer(data) {
      this.$emit("answerChanged", data);
      this.$set(
        this.jumperButtons,
        data.index,
        this.getQuestionColor(data.answer)
      );
    },
    getQuestionColor(answer) {
      if (!isAnswerEmpty(answer)) return "primary";
      return "";
    },
  },
  watch: {
    game: {
      immediate: true,
      handler(val) {
        this.startTimer();
        this.jumperButtons = val.questions.map((question) =>
          this.getQuestionColor(question.answer)
        );
      },
    },
  },
  beforeDestroy() {
    if (this.timer.interval) clearInterval(this.timer.interval);
  },
};
</script>
