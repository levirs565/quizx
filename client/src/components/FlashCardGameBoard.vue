<template>
  <base-game-board
    :game="game"
    :jumperButtons="jumperButtons"
    @finish="$emit('finish')"
  >
    <question
      :index="currentQuestionIndex"
      :question="currentQuestion"
      :initialAnswer="currentQuestion.answer"
      @answerChanged="$emit('answerChanged', $event)"
    />
    <v-btn
      @click="$emit('submitAnswer', currentQuestionIndex, currentQuestion.id)"
      >Submit</v-btn
    >
  </base-game-board>
</template>
<script>
import BaseGameBoard from "./BaseGameBoard.vue";
import Question from "./Question.vue";
export default {
  components: { BaseGameBoard, Question },
  props: {
    game: Object,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    currentQuestion() {
      return this.game.questions[this.currentQuestionIndex];
    },
    currentQuestionIndex() {
      return this.game.data.currentQuestionIndex;
    },
    jumperButtons() {
      return this.game.questions.map((val, index) => {
        const state = this.game.questionsState[index];
        if (state == 0) return "success";
        else if (state == 1) return "error";
      });
    },
  },
};
</script>
