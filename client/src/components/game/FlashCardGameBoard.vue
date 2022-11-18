<template>
  <base-game-board
    :game="game"
    :jumperButtons="jumperButtons"
    :showButtons="showButtons"
    @finish="emit('finish')"
  >
    <transition name="fade">
      <div v-if="showQuestion">
        <v-row no-gutters>
          <p v-if="gameData.preference.retryCount">
            Retry count: {{ gameData.currentQuestionRetryCount }}. Max retry
            count:
            {{ gameData.preference.retryCount }}
          </p>
          <v-spacer />
          <p v-if="gameData.preference.questionTimeSecond">
            Time left: {{ timer.text.value }}
          </p>
        </v-row>
        <question-view
          :index="currentQuestionIndex"
          :question="currentQuestion!"
          @answerChanged="emit('answerChanged', $event)"
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
<script lang="ts" setup>
import { useCountDownTimer } from "@/utils";
import BaseGameBoard from "./BaseGameBoard.vue";
import QuestionView, { AnswerChangedEvent } from "../question/Question.vue";
import {
  FlashCardGameData,
  Game,
  Question,
  QuestionState,
} from "@quizx/shared";
import { computed, ref, watch, watchEffect } from "vue";

export interface Props {
  game: Game;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "finish"): void;
  (e: "submitAnswer", index: number, id: string): void;
  (e: "answerChanged", event: AnswerChangedEvent): void;
}>();

const timer = useCountDownTimer();
const currentQuestion = ref<Question>();
const showQuestion = ref(false);
const showButtons = ref(false);

const gameData = computed(() => props.game.data as FlashCardGameData);

const currentQuestionIndex = computed(
  () => gameData.value.currentQuestionIndex
);

const jumperButtons = computed(() =>
  props.game.questions.map((val, index) => {
    const state = props.game.questionsState![index];
    if (state == QuestionState.Correct) return "success";
    else if (state == QuestionState.Incorrect) return "error";
    else if (state == QuestionState.Unanswered) return "warning";
  })
);
const showTryAgain = computed(() =>
  gameData.value.currentQuestionRetryCount
    ? gameData.value.currentQuestionRetryCount > 0
    : false
);

const submitCurrentAnswer = () => {
  emit("submitAnswer", currentQuestionIndex.value, currentQuestion.value!.id!);
};

watch(
  currentQuestionIndex,
  (val) => {
    showQuestion.value = false;
    if (val > -1) {
      showButtons.value = false;
      setTimeout(() => {
        currentQuestion.value = props.game.questions[val];
        showQuestion.value = true;
        showButtons.value = true;
      }, 500);
    } else {
      showButtons.value = true;
    }
  },
  {
    immediate: true,
  }
);

watchEffect(() => {
  const maxTime = gameData.value.currentQuestionMaxTime;
  if (maxTime) timer.start(maxTime.getTime(), submitCurrentAnswer);
});
</script>
