<template>
  <base-game-board
    :game="game"
    :jumperButtons="jumperButtons"
    @jumperClick="goToQuestion"
    @finished="emit('finished')"
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
        <question-view
          :index="index"
          :question="question"
          ref="questions"
          @answerChanged="putAnswer"
        >
        </question-view>
      </v-col>
    </v-row>
  </base-game-board>
</template>
<script lang="ts" setup>
import { useCountDownTimer, isAnswerEmpty } from "@/utils";
import BaseGameBoard from "./BaseGameBoard.vue";
import QuestionView, { AnswerChangedEvent } from "../question/Question.vue";
import { useLayout } from "vuetify";
import { ExamGameData, Game, QuestionAnswer } from "@quizx/shared";
import { inject, onBeforeUnmount, ref, watch } from "vue";
import { finishFunctionInjectionKey } from "@/dialog/DialogFinishGame.vue";

interface Props {
  game: Game;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "finished"): void;
  (e: "answerChanged", event: AnswerChangedEvent): void;
}>();

const { mainRect } = useLayout();
const timer = useCountDownTimer();

const jumperButtons = ref<string[]>([]);
const questions = ref<InstanceType<typeof QuestionView>[]>();
const finishFunction = inject<() => Promise<any>>(finishFunctionInjectionKey);

const startTimer = () => {
  const data = props.game.data as ExamGameData;
  if (data.maxFinishTime) {
    timer.start(data.maxFinishTime.getTime(), async () => {
      await finishFunction!();
      emit("finished");
    });
  }
};
const getElementTop = (el: HTMLElement) => {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  return el.getBoundingClientRect().top + scrollY;
};
const goToQuestion = (index: number) => {
  const element = questions.value![index].$el;
  const top = getElementTop(element) - mainRect.value.top;
  window.scrollTo(0, top);
};
const putAnswer = (event: AnswerChangedEvent) => {
  emit("answerChanged", event);

  jumperButtons.value[event.index] = getQuestionColor(event.answer);
};
const getQuestionColor = (answer: QuestionAnswer | undefined) => {
  if (!isAnswerEmpty(answer)) return "primary";
  return "";
};
watch(
  () => props.game,
  () => {
    startTimer();
    jumperButtons.value = props.game.questions.map((question) =>
      getQuestionColor(question.answer)
    );
  },
  {
    immediate: true,
  }
);
onBeforeUnmount(() => {
  timer.stop();
});
</script>
