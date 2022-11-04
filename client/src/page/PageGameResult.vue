<template>
  <resource-wrapper :state="state" @reload="loadGame">
    <template v-slot:toolbar>
      <v-toolbar-title>Game</v-toolbar-title>
    </template>

    <v-card>
      <v-card-title class="title">
        {{ game.quizTitle }}
      </v-card-title>

      <v-card-text>
        <v-row
          v-for="(entry, name) in results"
          :key="name"
          no-gutters
          class="text-body-1 text--primary"
        >
          <v-col>{{ entry.name }}</v-col>
          <v-col>{{ entry.value }}</v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <h2 class="text-h4 my-4">Questions</h2>

    <v-row dense>
      <v-col
        v-for="(question, index) in game.questions"
        :key="question.id"
        cols="12"
      >
        <question
          :index="index"
          :question="question"
          :editable="false"
          :initialAnswer="question.answer"
          :answerState="game.questionsState[index]"
        >
          <template v-slot:content>
            <p class="text-body-1 text--primary my-2">
              Correct answer:
              <math-field-base
                class="d-inline-block ml-2"
                v-if="question.type === 'math'"
                read-only
                :modelValue="game.correctAnswers[index]"
              />
              <span class="ml-2" v-else>
                {{ getQuestionCorrectAnswerText(index) }}
              </span>
            </p>
          </template>
        </question>
      </v-col>
    </v-row>
  </resource-wrapper>
</template>

<script>
import { Game } from "@/api";
import Question from "@/components/question/Question.vue";
import MathFieldBase from "@/components/math/MathFieldBase.vue";
import { getChoiceIndex } from "@/utils";
import ResourceWrapper, {
  updateResourceStateByPromise,
} from "@/components/resource/ResourceWrapper.vue";

export default {
  components: { Question, MathFieldBase, ResourceWrapper },
  props: {
    game_id: String,
  },
  data() {
    return {
      game: {},
      state: null,
      results: {
        score: {
          name: "Score",
          value: "N/A",
        },
        correct: {
          name: "Correct",
        },
        wrong: {
          name: "Wrong",
        },
        unanswered: {
          name: "Unanswered",
        },
      },
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
          this.results.correct.value = game.result.correct;
          this.results.wrong.value = game.result.wrong;
          this.results.unanswered.value = game.result.unanswered;
        }),
        (val) => {
          this.state = val;
        }
      );
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
