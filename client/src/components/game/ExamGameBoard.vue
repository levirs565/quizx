<template>
  <base-game-board
    :game="game"
    :jumperButtons="jumperButtons"
    @jumperClick="goToQuestion"
    @finish="$emit('finish')"
  >
    <template v-slot:sidebar>
      <v-card-text class="text-center text--primary pb-0" v-if="timer.started">
        <span class="text-h5">{{ timer.text.value }}</span>
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
import { useCountDownTimer, isAnswerEmpty } from "@/utils";
import BaseGameBoard from "./BaseGameBoard.vue";
import Question from "../question/Question.vue";
import { useLayout } from "vuetify";

export default {
  components: { Question, BaseGameBoard },
  props: {
    game: Object,
  },
  data() {
    return {
      jumperButtons: [],
    };
  },
  setup() {
    const { mainRect } = useLayout();
    const timer = useCountDownTimer();

    return {
      mainRect,
      timer,
    };
  },
  methods: {
    startTimer() {
      if (this.game.data.maxFinishTime) {
        this.timer.start(new Date(this.game.data.maxFinishTime).getTime(), () => {
          this.$emit("finish")
        });
      }
    },
    getElementTop(el) {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      return el.getBoundingClientRect().top + scrollY;
    },
    goToQuestion(index) {
      const element = this.$refs.questions[index].$el;
      const top = this.getElementTop(element) - this.mainRect.top;
      window.scrollTo(0, top);
    },
    putAnswer(data) {
      this.$emit("answerChanged", data);

      this.jumperButtons[data.index] = this.getQuestionColor(data.answer);
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
    this.timer.stop();
  },
};
</script>
