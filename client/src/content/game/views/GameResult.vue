<template>
  <resource-wrapper :state="state" @reload="loadGame" v-slot="{}">
    <div class="card block">
      <header class="card-header">
        <p class="card-header-title">Game</p>
      </header>

      <div class="card-content">
        <p class="title">
          {{ game.quizTitle }}
        </p>

        <table class="table game-result-table">
          <tr>
            <td>Score</td>
            <td>N/A</td>
          </tr>
          <tr>
            <td>Correct</td>
            <td>{{ game.result.correct }}</td>
          </tr>
          <tr>
            <td>Wrong</td>
            <td>{{ game.result.wrong }}</td>
          </tr>
          <tr>
            <td>Unanswered</td>
            <td>{{ game.result.unanswered }}</td>
          </tr>
        </table>
      </div>
    </div>

    <p class="subtitle">Questions</p>

    <ul>
      <li
        v-for="(question, index) in game.questions"
        :key="question.id"
        class="block"
      >
        <question
          :index="index"
          :question="question"
          :editable="false"
          :initialAnswer="question.answer"
        >
          <footer class="card-footer">
            <p class="card-footer-item question-correct-answer">
              Correct answer:
              <math-field
                class="is-inline-block ml-2"
                v-if="question.type === 'math'"
                read-only
                :value="game.correctAnswers[index]"
              />
              <span class="ml-2" v-else>
                {{ getQuestionCorrectAnswerText(index) }}
              </span>
            </p>
            <p
              class="card-footer-item question-state"
              :class="'has-text-' + getQuestionStateColor(index)"
            >
              <b-icon
                size="is-small"
                class="mr-1"
                :icon="getQuestionStateIcon(index)"
              />
              {{ getQuestionMessage(index) }}
            </p>
          </footer>
        </question>
      </li>
    </ul>
  </resource-wrapper>
</template>

<script>
import { Game } from "@/api";
import Question from "@/content/quiz/components/Question.vue";
import MathField from "@/components/MathField.vue";
import { getChoiceIndex } from "@/content/utils";
import ResourceWrapper, {
  updateResourceStateByPromise,
} from "@/components/ResourceWrapper.vue";

export default {
  components: { Question, MathField, ResourceWrapper },
  props: {
    game_id: String,
  },
  data() {
    return {
      game: {},
      state: null,
    };
  },
  mounted() {
    this.loadGame();
  },
  methods: {
    loadGame() {
      updateResourceStateByPromise(
        Game.getGame(this.game_id).then((game) => {
          this.game = game;
        }),
        (val) => {
          this.state = val;
        }
      );
    },
    getQuestionMessage(index) {
      const state = this.game.result.questionsState[index];
      if (state == 0) return "Answer is correct";
      else if (state == 1) return "Answer is wrong";
      else return "Unanswered";
    },
    getQuestionStateIcon(index) {
      const state = this.game.result.questionsState[index];
      if (state === 0) return "check";
      else if (state === 1) return "close";
      else return "help";
    },
    getQuestionStateColor(index) {
      const state = this.game.result.questionsState[index];
      if (state === 0) return "success";
      else if (state === 1) return "danger";
      else return "warning-dark";
    },
    getQuestionCorrectAnswerText(index) {
      const answer = this.game.correctAnswers[index];
      if (this.game.questions[index].type === "multiple-choice") {
        return getChoiceIndex(answer);
      }

      return answer;
    },
  },
};
</script>

<style scoped>
.game-result-table >>> tr > td {
  border: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.game-result-table >>> tr > td:first-child {
  padding-left: 0;
}

.question-state {
  flex-basis: auto;
  flex-grow: 0;
}

.question-correct-answer {
  justify-content: start;
  align-items: baseline;
}
</style>
