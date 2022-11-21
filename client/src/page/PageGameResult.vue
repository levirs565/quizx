<template>
  <resource-wrapper :state="state" @reload="loadGame">
    <template v-slot:toolbar>
      <v-toolbar-title>Game</v-toolbar-title>
    </template>

    <v-card>
      <v-card-title>
        {{ game!.quizTitle }}
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
        v-for="(question, index) in game!.questions"
        :key="question.id"
        cols="12"
      >
        <question
          :index="index"
          :question="question"
          :editable="false"
          :answerState="game!.questionsState![index]"
        >
          <template v-slot:content>
            <p class="text-body-1 text--primary my-2">
              Correct answer:
              <span
                v-if="question instanceof MathQuestion"
                class="ml-2 d-inline-block"
              >
                <math-live-field
                  class="d-inline"
                  readonly
                  :modelValue="game!.correctAnswers![index] as string"
                />
              </span>
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

<script lang="ts" setup>
import { gameApi } from "@/api";
import Question from "@/components/question/Question.vue";
import MathLiveField from "@/components/math/MathLiveField.vue";
import { getChoiceIndex } from "@/utils";
import ResourceWrapper, {
  ResourceState,
  updateResourceStateByPromise,
} from "@/components/resource/ResourceWrapper.vue";
import { Game, MultipleChoiceQuestion, MathQuestion } from "@quizx/shared";
import { onMounted, ref } from "vue";

export interface Props {
  game_id: string;
}

const props = defineProps<Props>();

const game = ref<Game>();
const state = ref<ResourceState>();
const results = ref({
  score: {
    name: "Score",
    value: "N/A",
  },
  correct: {
    name: "Correct",
    value: 0,
  },
  wrong: {
    name: "Wrong",
    value: 0,
  },
  unanswered: {
    name: "Unanswered",
    value: 0,
  },
});

const loadGame = () => {
  updateResourceStateByPromise(
    gameApi.getGame(props.game_id).then((newGame) => {
      game.value = newGame;
      results.value.correct.value = newGame.result!.correct;
      results.value.wrong.value = newGame.result!.wrong;
      results.value.unanswered.value = newGame.result!.unanswered;
    }),
    (newState) => {
      state.value = newState;
    }
  );
};
const getQuestionCorrectAnswerText = (index: number) => {
  const answer = game.value!.correctAnswers![index];
  if (game.value!.questions[index] instanceof MultipleChoiceQuestion) {
    return getChoiceIndex(answer as number);
  }

  return answer;
};
onMounted(loadGame);
</script>

<style scoped></style>
