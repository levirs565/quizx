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
import ResourceWrapper from "@/components/resource/ResourceWrapper.vue";
import { MultipleChoiceQuestion, MathQuestion } from "@quizx/shared";
import { computed, onMounted } from "vue";
import { useResourceState } from "@/components/resource/helper";

export interface Props {
  game_id: string;
}

const props = defineProps<Props>();

const {
  resource: game,
  load: loadGame,
  state,
} = useResourceState(() => gameApi.getGame(props.game_id));

const results = computed(() => {
  const gameResult = game.value?.result;
  return {
    score: {
      name: "Score",
      value: "N/A",
    },
    correct: {
      name: "Correct",
      value: gameResult?.correct ?? 0,
    },
    wrong: {
      name: "Wrong",
      value: gameResult?.wrong ?? 0,
    },
    unanswered: {
      name: "Unanswered",
      value: gameResult?.unanswered ?? 0,
    },
  };
});

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
